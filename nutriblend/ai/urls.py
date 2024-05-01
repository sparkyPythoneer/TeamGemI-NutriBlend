from django.urls import path
from .views import ChatView, ConversationHistoryView

urlpatterns = [
    path("chat/", ChatView.as_view(), name="chat"),
    path('chat-history/', ConversationHistoryView.as_view(), name='conversation-history'),
]

