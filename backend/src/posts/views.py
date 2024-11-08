
from rest_framework import generics, permissions
from src.posts.models import Post, Category, FavoritePost
from src.posts.serializers import PostSerializer, CategorySerializer, FavoritePostSerializer
from src.posts.permissions import IsVIPUser, IsAdminUser
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import get_object_or_404
from django.utils import timezone

    
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsVIPUser]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
class PostDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_queryset(self):
        if self.request.method == 'GET':
            return Post.objects.all()
        else:
            user = self.request.user
            if user.is_authenticated:
                return Post.objects.filter(creator=user)
            return Post.objects.none() 

class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        event_date = self.request.query_params.get('event_date', None)

        if event_date:
            try:
  
                start_date = timezone.datetime.strptime(event_date, "%Y-%m-%d")
                end_date = start_date + timezone.timedelta(days=1)  

   
                queryset = queryset.filter(event_date__range=(start_date, end_date))
            except Exception as e:
                print("Ошибка при фильтрации:", e)

        return queryset
class PostByEventDateListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False) or isinstance(self.request.user, AnonymousUser):
            return Post.objects.none()
        return Post.objects.filter(creator=self.request.user)

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [permissions.AllowAny()]
    
class PostByCategoryListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        category = get_object_or_404(Category, id=category_id)
        return Post.objects.filter(category=category)

class FavoritePostListView(generics.ListAPIView):
    serializer_class = FavoritePostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FavoritePost.objects.filter(user=self.request.user)

class FavoritePostCreateView(generics.CreateAPIView):
    serializer_class = FavoritePostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FavoritePostDeleteView(generics.DestroyAPIView):
    serializer_class = FavoritePostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):

        return FavoritePost.objects.get(user=self.request.user, post=self.kwargs['post_id'])
