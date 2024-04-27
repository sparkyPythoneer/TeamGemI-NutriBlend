from django.shortcuts import render
from .models import Conversation, Message
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions


class ChatView(APIView):
    permission_classes = [permissions.isAuthenticated]

    def post(self, request, *args, **kwargs):
        
        user_message = request.POST.get('user_message')
        conversation = Conversation.objects.create(user=request.user)
        Message.objects.create(conversation=conversation, sender='user', content=user_message)
        ai_response = "This is the AI's response."
        Message.objects.create(conversation=conversation, sender='AI', content=ai_response)
        messages = Message.objects.filter(conversation=conversation)
        data = [{'sender': msg.sender, 'content': msg.content} for msg in messages]
        return JsonResponse(data, safe=False)

    def get(self, request, *args, **kwargs):
        return render(request, 'chat.html')
