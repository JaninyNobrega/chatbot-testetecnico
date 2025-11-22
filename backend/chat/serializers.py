from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'user', 'content', 'is_response', 'timestamp', 'parent_message']
        read_only_fields = ['id', 'timestamp']

class MessageCreateSerializer(serializers.Serializer):
    user = serializers.ChoiceField(choices=['A', 'B'])
    content = serializers.CharField(max_length=5000)
    
    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("Mensagem vazia!")
        return value.strip()