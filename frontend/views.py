from django.shortcuts import render, redirect

from django.contrib.auth import logout
# Create your views here.

def login_view(request):
    return render(request, 'accounts/login.html')

def register_view(request):
    return render(request, 'accounts/register.html')

def logout_view(request):
    return redirect("home_view")

def profile_view(request):
    return render(request, 'accounts/profile.html')

def home_view(request):
    return render(request, 'home/home.html')

def create_room_view(request):
    return render(request, 'rooms/create_room.html')

def room_view(request, slug):
    
    context = {
        "slug" : slug,
    }

    return render(request, 'rooms/room.html', context)
