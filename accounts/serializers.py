from django.contrib.auth.models import User
from rest_framework import serializers

class RegistrationSerializer(serializers.ModelSerializer):
    
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    confirmpassword = serializers.CharField(style={'input_type' : 'password'}, write_only = True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'confirmpassword']
        extra_kwargs = {
            'password' : {'write_only' : True}
        }

    def save(self):
        user = User(
            username = self.validated_data['username'], 
            first_name = self.validated_data['first_name'], 
            last_name = self.validated_data['last_name'], 
            email = self.validated_data['email']
        )

        password = self.validated_data['password']
        conpassword = self.validated_data['confirmpassword']

        if password != conpassword:
            raise serializers.ValidationError({'message' : "Password and confirm-password must match"})
        
        user.set_password(password)
        user.save()
        return user