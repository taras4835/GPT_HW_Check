from openai import OpenAI
from django.conf import settings
import base64
from django.core.files.base import ContentFile

def get_base64_from_content_file(content_file):
    # Читаем содержимое файла
    content = content_file.read()
    # Кодируем в base64
    base64_content = base64.b64encode(content).decode('utf-8')
    # Добавляем префикс data URL в зависимости от типа файла
    mime_type = "image/jpeg"  # Можно добавить определение mime-type если нужно
    return f"data:{mime_type};base64,{base64_content}"

def get_gpt_response(check, photos_data):
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    prompt = f"""
    You are school teacher. You are given a description of work and photos.
    You need to check the work and provide a detailed report.
    """
    
    images = []
    for photo in photos_data:
        photo_content = photo['photo']
        if isinstance(photo_content, ContentFile):
            # Если это ContentFile, преобразуем в base64
            image_url = get_base64_from_content_file(photo_content)
        else:
            # Если это уже URL или строка, используем как есть
            image_url = photo_content
        
        print(image_url)
        images.append({
            "type": "image_url",
            "image_url": {
                "url": image_url
            }
        })

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    *images,
                ],
            }
        ],
        max_tokens=300,
    )

    return response.choices[0].message.content


