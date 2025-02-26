from django.shortcuts import render
from checks.models import Check
from checks.serializers import CheckSerializer, CheckListSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated      
from rest_framework.pagination import PageNumberPagination
from users.authentication import TelegramAuthentication


class CheckPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class CheckModelViewSet(ModelViewSet):
    authentication_classes = [TelegramAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CheckSerializer
    pagination_class = CheckPagination

    def get_queryset(self):
        return Check.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        # Используем другой сериализатор для действия "list" (без фото)
        if self.action == 'list':
            return CheckListSerializer
        return CheckSerializer
    
    def get_serializer_context(self):
        # Получаем стандартный контекст: request, view, format
        context = super().get_serializer_context()
        # Можно добавить любые дополнительные данные
        context['user'] = self.request.user
        return context
