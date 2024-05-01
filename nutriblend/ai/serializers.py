from rest_framework import serializers
from .models import Conversation, Message


class ConversationSerilaizer(serializers.ModelSerializer):

    class Meta:
        model = Conversation
        fieldds = ['id', 'user', 'created_at', 'updated_at']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'content', 'created_at', 'updated_at']


class ConversationHistorySerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'user', 'messages']

    def get_messages(self, obj):
        messages = obj.message_set.order_by('created_at')
        return MessageSerializer(messages, many=True).data