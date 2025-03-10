from rest_framework import routers
from .views import PlanViewSet
from django.urls import path
from .views import get_invoice

router = routers.DefaultRouter()
router.register(r'plans', PlanViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('webhook/', get_invoice, name='get_invoice'),
]