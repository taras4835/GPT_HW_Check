import logging

from django.conf import settings
from django.http import HttpResponse
from telebot import types
from django.views.decorators.csrf import csrf_exempt
from telebot.storage import StateRedisStorage
from telebot import TeleBot

bot = TeleBot(settings.TELEGRAM_TOKEN)

@csrf_exempt
def process_update(request):
    json_string = request.body.decode('utf-8')
    update = types.Update.de_json(json_string)

    # habdle start command
    if update.message.text == '/start':
        bot.send_message(update.message.chat.id, 'Привет! Я помогу проверить домашнее задание.',
                         reply_markup=types.InlineKeyboardMarkup(
                             inline_keyboard=[
                                 [types.InlineKeyboardButton('🎮 Старт', web_app=types.WebAppInfo(url='https://hyperdive.app/telegram_app_login'))]
                             ]
                         ),
                         parse_mode='Markdown')

    return HttpResponse(status=200)