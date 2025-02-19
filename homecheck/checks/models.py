from django.db import models
from users.models import User


class Check(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='checks')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    input_text = models.TextField(
        blank=True,
        null=True,
        help_text="Текст работы, который будет отправлен в OpenAI для проверки"
    )

    result = models.TextField(
        blank=True,
        null=True,
        help_text="Ответ от OpenAI"
    )

    def __str__(self):
        return f"Check {self.id} by {self.user}"


class Photo(models.Model):
    hw_check = models.ForeignKey(Check, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to='photos/')

    def __str__(self):
        return f"Photo for Check {self.check.id}"
