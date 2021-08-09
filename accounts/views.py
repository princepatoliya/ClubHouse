

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import (
    RegistrationSerializer
)


@api_view(['POST',])
def registration_view(request):
    
    if request.method == "POST":
        serializer = RegistrationSerializer(data = request.data)
        data = {}
        data['status'] = 500
        data['message'] = "Something went wrong"

        if serializer.is_valid():
            user = serializer.save()
            data['status'] = 200
            data['message'] = "Account created successfully."
        else:
            data['message'] = "Password and confirm-password must match"

        return Response(data)