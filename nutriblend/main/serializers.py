from rest_framework import serializers
from .models import Conversation, Message


class ConversationSerilaizer(serializers.ModelSerializer):

    class Meta:
        model = Conversation
        fieldds = ['id', '']