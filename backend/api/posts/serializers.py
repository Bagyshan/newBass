from rest_framework import serializers
from api.posts.models import Post, Category, FavoritePost

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class FavoritePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoritePost
        fields = '__all__'
