import json
from graphql_relay.node.node import from_global_id

import graphene

from document_extract_app.models import ExtractRequest, Document
from graphene import ObjectType, Node, Schema
from graphene_django.fields import DjangoConnectionField
from graphene_django.types import DjangoObjectType

class ExtractRequestNode(DjangoObjectType):
    class Meta:
        model = ExtractRequest
        interfaces = (Node, )

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


class Query(ObjectType):
    extract_request = Node.Field(ExtractRequestNode)
    all_extract_requests = DjangoConnectionField(ExtractRequestNode)

    document = Node.Field(DocumentNode)
    all_documents = DjangoConnectionField(DocumentNode)

class Mutations(graphene.ObjectType):
    update_document = UpdateDocument.Field()

schema = Schema(query=Query, mutation=Mutations)