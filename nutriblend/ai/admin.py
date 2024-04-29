from django.contrib import admin
from .models import Conversation, Message

class ConversationAdmin(admin.ModelAdmin):
    list_display = ('user',)

admin.site.register(Conversation, ConversationAdmin)

class MessageAdmin(admin.ModelAdmin):
    list_display = ('conversation', 'sender', 'content',)
    list_filter = ('conversation', 'sender',)
    search_fields = ('conversation__user__username', 'content',)

admin.site.register(Message, MessageAdmin)
