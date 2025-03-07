from django.apps import AppConfig
from django.conf import settings
from telebot import TeleBot


class BotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bot'

    def ready(self):
        bot = TeleBot(settings.BOT_TOKEN)
        bot.set_webhook(url=settings.TELEGRAM_BOT_WEBHOOK_URL)
