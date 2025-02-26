from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404
from users.models import User
from users.authentication import TelegramAuthentication
from rest_framework.permissions import IsAuthenticated
import json
from users.serializers import UserSerializer


class UserViewSet(ModelViewSet):
    authentication_classes = [TelegramAuthentication]
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
    
    serializer_class = UserSerializer

