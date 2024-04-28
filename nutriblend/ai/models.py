from django.conf import settings
from django.db import models
from core.models import BaseModel

User = settings.AUTH_USER_MODEL

class Conversation(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):  
        return f"Conversation between {self.user.username} and AI"


class Message(BaseModel):
    SENDER = (
        ('USER', 'User'),
        ('GEMINI', 'Gemini')
    )
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sender = models.CharField(choices=SENDER, max_length=100, blank=True, null=True)
    content = models.TextField()

    def __str__(self):
        return f"{self.sender}: {self.content}"