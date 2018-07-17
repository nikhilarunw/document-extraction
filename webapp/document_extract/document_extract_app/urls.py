# Routers provide an easy way of automatically determining the URL conf.
from django.conf.urls import url, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers

#Api Router
from document_extract_app.views import DocumentViewSet, ExtractRequestViewSet
from graphene_django.views import GraphQLView

router = routers.DefaultRouter()
router.register(r'documents', DocumentViewSet)
router.register(r'extract_requests', ExtractRequestViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    url(r'^', include(router.urls)),
]