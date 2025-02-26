from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    telegram_id = models.CharField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)

    balance = models.IntegerField(default=10)


    def __str__(self):
        return self.username

