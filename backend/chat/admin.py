from django.contrib import admin
from .models import Message

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'content', 'is_response', 'timestamp']
    list_filter = ['user', 'is_response']