from django.db.models import fields
from rest_framework import serializers

from django.contrib.auth.models import User
from .models import (
    VoiceRoom, 
    VoiceRoomUser
)


class VoiceRoomSerializers(serializers.ModelSerializer):
    class Meta:
        model = VoiceRoom
        fields = ['room_title', 'description']

    
    def save(self, host):
        voiceroom = VoiceRoom(
            room_host = host,
            room_title = self.validated_data['room_title'],
            description = self.validated_data['description']
        )

        voiceroom.save()
        return voiceroom

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class GetVoiceRoomDetailSerializers(serializers.ModelSerializer):

    room_host  = UserSerializers()
    class Meta:
        model = VoiceRoom
        fields = ['room_host', 'room_title', 'description', 'slug']
       
