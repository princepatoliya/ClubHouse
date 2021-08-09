from django.urls import path

from .views import (
    login_view,
    register_view,
    logout_view,

    home_view,
    profile_view,
    room_view,
    create_room_view,
)

urlpatterns = [
    path('login/', login_view, name="login_view"),
    path('register/', register_view, name="register_view"),
    path('logout/', logout_view, name="logout_view"),
    
    path('', home_view, name="home_view"),
    path('profile/', profile_view, name="profile_view"),
    path('create_room/', create_room_view, name="create_room_view"),
    path('room/<slug>', room_view, name="room_view"),
    
]
