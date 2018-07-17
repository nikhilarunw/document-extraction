# Routers provide an easy way of automatically determining the URL conf.
from django.conf.urls import url, include
from rest_framework import routers

#Api Router
from document_extract_app.views import DocumentViewSet, ExtractRequestViewSet

router = routers.DefaultRouter()
router.register(r'documents', DocumentViewSet)
router.register(r'extract_requests', ExtractRequestViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
]