from django.urls import path
from bot.views import process_update


urlpatterns = [
    path('process', process_update),
]