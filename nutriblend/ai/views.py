from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions

from main.models import UserProfile
from .models import Conversation, Message
from .utils import generate_ai_response, generate_recipe_ai_prompt
from .serializers import ConversationHistorySerializer, MessageSerializer

class ChatView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(user=request.user)
        user_message = request.data.get('user_message')  # Assuming the message is sent via POST data
        conversation = Conversation.objects.create(user=request.user)

        # Save user message
        user_message_obj = Message.objects.create(conversation=conversation, sender='user', content=user_message)

        # Generate AI response
        # ai_response = generate_ai_response(user_message)
        ai_response = generate_recipe_ai_prompt(user_profile, user_message)

        # Save AI response
        ai_message_obj = Message.objects.create(conversation=conversation, sender='AI', content=ai_response)

        # Get all messages in the conversation
        messages = Message.objects.filter(conversation=conversation)

        # Serialize messages
        message_serializer = MessageSerializer(messages, many=True)

        return Response(message_serializer.data)


class ConversationHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        conversations = Conversation.objects.filter(user=user).order_by('-created_at')
        serializer = ConversationHistorySerializer(conversations, many=True)
        return Response(serializer.data)