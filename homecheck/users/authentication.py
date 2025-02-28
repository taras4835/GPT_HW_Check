from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from urllib.parse import unquote
from hashlib import sha256
import hmac

from users.models import User

class TelegramAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Извлекаем заголовки из запроса
        telegram_id = request.META.get("HTTP_TELEGRAM_ID")
        telegram_data = request.META.get("HTTP_TELEGRAM_DATA")

        if not telegram_id or not telegram_data:
            raise AuthenticationFailed("Заголовки telegram_id и telegram_data обязательны.")

        # Валидируем telegram_data с использованием bot_token из настроек
        '''
        init_data_dict = self.validate(telegram_data, settings.BOT_TOKEN)
        if init_data_dict is None:
            raise AuthenticationFailed("Валидация TG Hash не удалась.")
        '''

        user = User.objects.get_or_create(telegram_id=telegram_id, username=telegram_id) # TODO: username из telegram_data

        # Можно дополнительно сравнить данные из telegram_data и данные пользователя из базы

        return user

    def validate(self, init_data: str, token: str, c_str="WebAppData") -> dict | None:
        """
        Валидирует данные, полученные от Telegram.
        """
        hash_string = ""
        init_data_dict = {}

        for chunk in init_data.split("&"):
            # Разбиваем по первому "="
            try:
                key, value = chunk.split("=", 1)
            except ValueError:
                continue  # Пропускаем некорректные части

            if key == "hash":
                hash_string = value
                continue
            init_data_dict[key] = unquote(value)

        if not hash_string:
            return None

        # Формируем строку для проверки, сортируя ключи
        sorted_data = "\n".join(f"{key}={init_data_dict[key]}" for key in sorted(init_data_dict.keys()))

        secret_key = hmac.new(c_str.encode(), token.encode(), digestmod=sha256).digest()
        data_check = hmac.new(secret_key, sorted_data.encode(), digestmod=sha256)

        if data_check.hexdigest() != hash_string:
            return None

        return init_data_dict 