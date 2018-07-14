from django.shortcuts import render
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet

from document_extract_app.models import Document, ExtractRequest


class DocumentSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'

class DocumentViewSet(ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()

class ExtractRequestSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'

class ExtractRequestViewSet(ModelViewSet):
    serializer_class = ExtractRequestSerializer
    queryset = ExtractRequest.objects.all()