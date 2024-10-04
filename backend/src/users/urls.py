from django.urls import path
from src.users.views import UserCreateView, UserLoginView, UserDetailView, UserSubscribeView, UserSubscriptionsView, UserSubscribersView, UserListView, CurrentUserView, UserDeleteView, UserUpdateView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('subscribe/<int:user_id>/', UserSubscribeView.as_view(), name='subscribe'),
    path('subscriptions/', UserSubscriptionsView.as_view(), name='user-subscriptions'),
    path('subscribers/', UserSubscribersView.as_view(), name='user-subscribers'),
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('users/', UserListView.as_view(), name='user-list'),  
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('current_user/', CurrentUserView.as_view(), name='current-user'),  
    path('subscribe/<int:user_id>/', UserSubscribeView.as_view(), name='subscribe'),
    path('subscriptions/', UserSubscriptionsView.as_view(), name='user-subscriptions'),
    path('subscribers/', UserSubscribersView.as_view(), name='user-subscribers'),
    path('users/update/', UserUpdateView.as_view(), name='user-update'),  
    path('users/delete/', UserDeleteView.as_view(), name='user-delete')
]

