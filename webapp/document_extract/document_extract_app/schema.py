import graphene
from graphene import ObjectType, Node, Schema
from graphene_django.fields import DjangoConnectionField
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import from_global_id, to_global_id

from document_extract_app.models import ExtractRequest, Document, ExtractionModel
from document_extract_app.services import extract_document_data

"""
Extraction Request Schema
"""


class ExtractRequestNode(DjangoObjectType):
    class Meta:
        model = ExtractRequest
        interfaces = (Node,)


"""
Document Schema
"""


class DocumentNode(DjangoObjectType):
    class Meta:
        model = Document
        interfaces = (Node,)


class DocumentInput(graphene.InputObjectType):
    id = graphene.ID(required=True)
    annotated_json = graphene.JSONString(required=True)


class UpdateDocument(graphene.Mutation):
    class Arguments:
        document_data = DocumentInput(required=True)

    document = Node.Field(DocumentNode)

    @staticmethod
    def mutate(root, info, document_data=None):
        record_global_id = from_global_id(document_data.id)

        print(record_global_id)

        document = Document.objects.get(id=record_global_id[1])
        document.annotated_json = document_data.annotated_json
        document.save()

        return UpdateDocument(document=document)


class ExtractionDataInput(graphene.InputObjectType):
    document_id = graphene.ID(required=True)
    extraction_model_id = graphene.ID(required=True)


class ExtractDocumentData(graphene.Mutation):
    class Arguments:
        extraction_data = ExtractionDataInput(required=True)

    document = Node.Field(DocumentNode)

    @staticmethod
    def mutate(root, info, extraction_data=None):
        document_global_id = from_global_id(extraction_data.document_id)
        extraction_model_global_id = from_global_id(extraction_data.extraction_model_id)

        document = Document.objects.get(id=document_global_id[1])
        extraction_model = ExtractionModel.objects.get(id=extraction_model_global_id[1])

        document.extracted_json = extract_document_data(document.id, extraction_model.id)

        document.save()

        return UpdateDocument(document=document)


"""
Extraction Model Schema
"""


class ExtractionModelOutput(DjangoObjectType):
    class Meta:
        model = ExtractionModel


class ExtractionModelNode(DjangoObjectType):
    class Meta:
        model = ExtractionModel
        interfaces = (Node,)


class CreateExtractionModelInput(graphene.InputObjectType):
    model_type = graphene.String(required=False)


class UpdateExtractionModelInput(graphene.InputObjectType):
    id = graphene.ID(required=True)
    config_json = graphene.JSONString(required=True)


class CreateExtractionModel(graphene.Mutation):
    class Arguments:
        extraction_model_data = CreateExtractionModelInput(required=True)

    extraction_model = graphene.Field(ExtractionModelOutput)

    @staticmethod
    def mutate(root, info, extraction_model_data=None):
        extraction_model = ExtractionModel()
        extraction_model.model_type = extraction_model_data.model_type
        extraction_model.save()

        extraction_model.id = to_global_id('ExtractionModelNode', extraction_model.id)

        return CreateExtractionModel(extraction_model=extraction_model)


class UpdateExtractionModel(graphene.Mutation):
    class Arguments:
        extraction_model_data = UpdateExtractionModelInput(required=True)

    extraction_model = graphene.Field(ExtractionModelOutput)

    @staticmethod
    def mutate(root, info, extraction_model_data=None):
        record_global_id = from_global_id(extraction_model_data.id)

        extraction_model = ExtractionModel.objects.get(id=record_global_id[1])
        extraction_model.config_json = extraction_model_data.config_json
        extraction_model.save()

        extraction_model.id = to_global_id('ExtractionModelNode', extraction_model.id)

        return CreateExtractionModel(extraction_model=extraction_model)


"""
Query
"""


class Query(ObjectType):
    extract_request = Node.Field(ExtractRequestNode)
    all_extract_requests = DjangoConnectionField(ExtractRequestNode)

    document = Node.Field(DocumentNode)
    all_documents = DjangoConnectionField(DocumentNode)

    extraction_model = Node.Field(ExtractionModelNode)
    all_extraction_models = DjangoConnectionField(ExtractionModelNode)


"""
Mutations
"""


class Mutations(graphene.ObjectType):
    update_document = UpdateDocument.Field()
    create_extraction_model = CreateExtractionModel.Field()
    update_extraction_model = UpdateExtractionModel.Field()
    extract_document_data = ExtractDocumentData.Field()


schema = Schema(query=Query, mutation=Mutations)
