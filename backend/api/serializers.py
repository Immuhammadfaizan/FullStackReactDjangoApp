from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwrags = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        # Unpack the validated data and pass it as keyword arguments to the User model's create method
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        extra_kwargs = {'author': {"read_only": True}} # can also write instead "read_only_fields = ['author']"
        