from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer, MessageCreateSerializer

@api_view(['GET'])
def get_messages(request):
    user = request.query_params.get('user')
    
    if not user or user not in ['A', 'B']:
        return Response({"error": "Usuário inválido"}, status=400)
    
    messages = Message.objects.filter(user=user).order_by('timestamp')
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def send_message(request):
    serializer = MessageCreateSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    
    user = serializer.validated_data['user']
    content = serializer.validated_data['content']
    
    user_message = Message.objects.create(
        user=user,
        content=content,
        is_response=False
    )
    
    response_texts = {
        'A': "Obrigado por seu contato, Usuário A! Em breve responderemos.",
        'B': "Olá Usuário B! Recebemos sua mensagem e retornaremos em breve."
    }
    
    system_response = Message.objects.create(
        user=user,
        content=response_texts[user],
        is_response=True,
        parent_message=user_message
    )
    
    return Response({
        'user_message': MessageSerializer(user_message).data,
        'system_response': MessageSerializer(system_response).data
    }, status=201)