from django.http import response
from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    VoiceRoomSerializers,
    GetVoiceRoomDetailSerializers
)

from .twilio_create import TwilioRoomCreate, Create_token

from .models import VoiceRoom

@api_view(['POST', ])
@permission_classes((IsAuthenticated,))
def VoiceRoomCreate_view(request):
    
    if request.method == "POST":

        serializer = VoiceRoomSerializers(data = request.data)
        
        response = {}

        if serializer.is_valid():
            user = request.user

            if len(VoiceRoom.objects.filter(room_host = user.id, is_active = True)) > 0:
                # print(len(VoiceRoom.objects.filter(room_host = user.id, is_active = True)))
                response['message'] = "Only one room at time is allowed."
            else:
                serializer.save(user)
                slug = VoiceRoom.objects.filter(room_host = user.id, is_active = True).values('slug').first()['slug']

                room_payload = TwilioRoomCreate(slug)

                response['status'] = 200
                response['message'] = "Room Created successfully."
                response['slug'] = slug
                response['room_payload'] = room_payload
                

            return Response(response)
        else:
            response['status'] = 401
            response['message'] = "Something went wrong."
            response['error'] = serializer.errors
            return Response(response)


@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def GetVoiceRoomDetail_view(request):
    voiceroom = VoiceRoom.objects.filter(is_active = True)
    voiceroomseri = GetVoiceRoomDetailSerializers(voiceroom, many=True)

    response = {}
    response['status'] = 200
    response['payload'] = voiceroomseri.data

    return Response(response)


@api_view(['GET'])
@permission_classes([IsAuthenticated,])
def liveRoomDetail_view(request, slug):
    
    user = VoiceRoom.objects.get(slug = slug)
    response = {}
    

    voiceroomseri = GetVoiceRoomDetailSerializers(user)
    if voiceroomseri.is_valid:

        print("-----------username : ", request.user.username)
        
        room_token = Create_token(request.user.username, slug)


        response['status'] = 200
        response['message'] = "Joined"
        response['payload'] = voiceroomseri.data
        
        response['slug'] = slug
        response['room_token'] = room_token

        return Response(response)
    else:
        response['status'] = 500
        response['message'] = "Something went wrong."



