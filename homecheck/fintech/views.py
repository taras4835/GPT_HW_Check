from django.shortcuts import render
from rest_framework import viewsets
from .models import Plan
from .serializers import PlanSerializer
from telebot import TeleBot
from telebot import types
from django.conf import settings
from django.http import JsonResponse

class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer



def get_invoice(request):
    provider_token = settings.PROVIDER_TOKEN
    bot = TeleBot(settings.BOT_TOKEN)
    response = bot.create_invoice_link("Покупка",
                                       "Тестовый",
                                       "true",provider_token,"rub",[types.LabeledPrice('Покупка',500 * 100)])
    print(response)
    response = JsonResponse({"invoice_url": response})
    print(response)
    return response