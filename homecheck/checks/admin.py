from django.contrib import admin
from django.utils.html import format_html
from .models import Check

@admin.register(Check)
class CheckAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'created_at', 'display_photos']
    list_display_links = ['id', 'user']
    readonly_fields = ['display_photos_detail']
    
    def display_photos(self, obj):
        if obj.photos:
            return format_html(
                '<img src="{}" style="max-height: 50px;"/>',
                obj.photos[0] if isinstance(obj.photos, list) else obj.photos
            )
        return "Нет фото"
    display_photos.short_description = 'Фото'

    def display_photos_detail(self, obj):
        if not obj.photos:
            return "Нет фото"
        
        html = '<div style="display: flex; gap: 10px; flex-wrap: wrap;">'
        photos = obj.photos if isinstance(obj.photos, list) else [obj.photos]
        for photo in photos:
            html += f'<img src="{photo}" style="max-height: 200px; margin: 5px;"/>'
        html += '</div>'
        return format_html(html)
    display_photos_detail.short_description = 'Фотографии'

    fieldsets = (
        ('Основная информация', {
            'fields': ('user',)
        }),
        ('Фотографии', {
            'fields': ('photos', 'display_photos_detail')
        }),
    )
