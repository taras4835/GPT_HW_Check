from openai import OpenAI
from django.conf import settings


def get_gpt_response(check, photos_data):
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    prompt = f"""
    You are school teacher. You are given a description of work and photos.
    You need to check the work and provide a detailed report.
    """
    images = [
        {
            "type": "image_url",
            "image_url": {
                "url": photo['photo']
            }
        } for photo in photos_data
    ]
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


