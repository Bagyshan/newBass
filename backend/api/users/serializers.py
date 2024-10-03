from django.contrib.auth import get_user_model
from rest_framework import serializers
from api.users.models import Subscription

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'avatar', 'user_type')

class UserCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, max_length=150)
    email = serializers.EmailField(required=True, max_length=255)

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'password', 'avatar')  

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.user_type = 'regular'  
        user.save()
        return user

class SubscriptionSerializer(serializers.ModelSerializer):
    subscriber = UserSerializer(read_only=True)  
    user = UserSerializer(read_only=True) 

    class Meta:
        model = Subscription
        fields = ['user', 'subscriber']
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'avatar')

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance