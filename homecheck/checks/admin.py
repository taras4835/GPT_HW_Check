from django.contrib import admin
from django.utils.html import format_html
from .models import Check, Photo

admin.site.register(Check)
admin.site.register(Photo)
