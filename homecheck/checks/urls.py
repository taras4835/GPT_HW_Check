from django.urls import path, include
from rest_framework.routers import DefaultRouter
from checks.views import CheckModelViewSet

router = DefaultRouter()
router.register(r'checks', CheckModelViewSet, basename='check')

urlpatterns = [
    path('', include(router.urls)),
]
