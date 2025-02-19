import base64
import uuid
from django.core.files.base import ContentFile
from rest_framework import serializers
from checks.models import Check, Photo
from checks.utils import get_gpt_response
from io import BytesIO
from PIL import Image


class Base64ImageField(serializers.ImageField):
    """
    Сериализатор для поля изображения, которое передаётся в формате base64.
    """
    def to_internal_value(self, data):
        # Если входные данные — строка и содержат данные base64
        if isinstance(data, str):
            if "data:" in data and ";base64," in data:
                header, data = data.split(';base64,')
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail("invalid_image")

            file_extension = self.get_file_extension(decoded_file)
            file_name = str(uuid.uuid4())[:12]
            complete_file_name = f"{file_name}.{file_extension}"
            data = ContentFile(decoded_file, name=complete_file_name)
        return super().to_internal_value(data)

    def get_file_extension(self, decoded_file):
        try:
            with BytesIO(decoded_file) as buffer:
                image = Image.open(buffer)
                extension = image.format.lower()
                if extension == "jpeg":
                    extension = "jpg"
                return extension
        except Exception:
            return "jpg"  # Значение по умолчанию, если не удалось определить формат

class PhotoSerializer(serializers.ModelSerializer):
    photo = Base64ImageField(max_length=None, use_url=True)
    
    class Meta:
        model = Photo
        fields = ['id', 'photo']

class CheckSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, required=False)
    
    class Meta:
        model = Check
        fields = ['id', 'user', 'created_at', 'updated_at', 'input_text', 'result', 'photos']
        read_only_fields = ['result']

    def create(self, validated_data):
        # Извлекаем данные для фото (если есть)
        photos_data = validated_data.pop('photos', [])
        check = Check.objects.create(**validated_data)

        for photo_data in photos_data:
            Photo.objects.create(check=check, **photo_data)

        result = get_gpt_response(check, photos_data)
        check.result = result
        check.save()

        return check
    
    def update(self, instance, validated_data):
        # Извлекаем данные для фото (если переданы)
        photos_data = validated_data.pop('photos', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if photos_data is not None:
            # Опционально: удаляем старые фото и создаём новые
            instance.photos.all().delete()
            for photo_data in photos_data:
                Photo.objects.create(hw_check=instance, **photo_data)
        return instance
    

class CheckListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Check
        fields = ['id', 'user', 'created_at', 'updated_at', 'input_text', 'result'] 

