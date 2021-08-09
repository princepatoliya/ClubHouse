from django.urls import path
from .views import (
    VoiceRoomCreate_view,
    GetVoiceRoomDetail_view,
    liveRoomDetail_view
)

app_name = "rooms"

urlpatterns = [
    path('create_room/', VoiceRoomCreate_view, name="VoiceRoomCreate_view"),
    path('show_rooms/', GetVoiceRoomDetail_view, name="GetVoiceRoomDetail"),
    path('live_room/<slug>/', liveRoomDetail_view, name="liveRoomDetail_view")
]