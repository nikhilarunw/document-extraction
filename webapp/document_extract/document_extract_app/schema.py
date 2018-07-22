from graphql_relay.node.node import from_global_id

import graphene

from document_extract_app.models import ExtractRequest, Document, ExtractionModel
from graphene import ObjectType, Node, Schema
from graphene_django.fields import DjangoConnectionField
from graphene_django.types import DjangoObjectType

"""
Extraction Request Schema
"""
class ExtractRequestNode(DjangoObjectType):
    class Meta:
        model = ExtractRequest
        interfaces = (Node, )

"""
Document Schema
"""
class DocumentNode(DjangoObjectType):
    class Meta:
        model = Document
        interfaces = (Node, )

class DocumentInput(graphene.InputObjectType):
    id = graphene.ID(required=True)
    annotated_json = graphene.JSONString(required=True)

class UpdateDocument(graphene.Mutation):
    class Arguments:
        document_data = DocumentInput(required=True)

    document = Node.Field(DocumentNode)

    @staticmethod
    def mutate(root, info, document_data=None):
        record_id = from_global_id(document_data.id)

        document = Document.objects.get(id=record_id[1])
        document.annotated_json=document_data.annotated_json
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
        interfaces = (Node, )

class ExtractionModelInput(graphene.InputObjectType):
    tags = graphene.JSONString(required=True)
    config_json = graphene.JSONString(required=True)

class CreateExtractionModel(graphene.Mutation):
    class Arguments:
        extraction_model_data = ExtractionModelInput(required=True)

    extraction_model = graphene.Field(ExtractionModelOutput)

    @staticmethod
    def mutate(root, info, extraction_model_data=None):
        extraction_model = ExtractionModel()
        extraction_model.tags=extraction_model_data.tags
        extraction_model.config_json=extraction_model_data.config_json
        extraction_model.save()

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

schema = Schema(query=Query, mutation=Mutations)