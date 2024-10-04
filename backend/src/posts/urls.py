from django.urls import path
from src.posts.views import (
    PostListCreateView, PostDetailUpdateDeleteView, PostListView, 
    PostByEventDateListView, CategoryListCreateView, FavoritePostListView, 
    FavoritePostCreateView, FavoritePostDeleteView, PostByCategoryListView
)

urlpatterns = [
    path('posts/', PostListView.as_view(), name='post-list'),
    path('posts/create/', PostListCreateView.as_view(), name='post-create'),  
    path('posts/<int:pk>/', PostDetailUpdateDeleteView.as_view(), name='post-detail-update-delete'), 
    path('posts/by-category/<int:category_id>/', PostByCategoryListView.as_view(), name='post-by-category'), 
    path('posts/by-date/', PostByEventDateListView.as_view(), name='post-by-event-date'),  
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('favorites/', FavoritePostListView.as_view(), name='favorite-posts'), 
    path('favorites/add/', FavoritePostCreateView.as_view(), name='add-favorite-post'),  
    path('favorites/delete/<int:post_id>/', FavoritePostDeleteView.as_view(), name='delete-favorite-post'), 
]