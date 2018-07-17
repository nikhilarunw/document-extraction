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

class Query(ObjectType):
    extract_request = Node.Field(ExtractRequestNode)
    all_extract_requests = DjangoConnectionField(ExtractRequestNode)

    document = Node.Field(DocumentNode)
    all_documents = DjangoConnectionField(DocumentNode)

schema = Schema(query=Query)