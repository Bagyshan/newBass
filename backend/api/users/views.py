from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from api.users.models import User, Subscription
from .serializers import UserSerializer, UserCreateSerializer, SubscriptionSerializer, UpdateUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(request_body=UserCreateSerializer)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(responses={200: UserSerializer})
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class UserSubscribeView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SubscriptionSerializer  

    @swagger_auto_schema(request_body=None, responses={200: SubscriptionSerializer})
    def post(self, request, user_id):
        try:
            user_to_subscribe = User.objects.get(id=user_id)
            request.user.subscriptions.add(user_to_subscribe)
            subscription, created = Subscription.objects.get_or_create(
                user=user_to_subscribe,
                subscriber=request.user
            )
            
            serializer = self.get_serializer(subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "Пользователь не найден."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Ошибка: {e}") 
            return Response({"detail": "Ошибка сервера."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class UserSubscriptionsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)

class UserSubscribersView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        return Subscription.objects.filter(subscriber=self.request.user)


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(responses={200: UserSerializer(many=True)})
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(responses={200: UserSerializer})
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    @swagger_auto_schema(responses={200: UserSerializer})
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UpdateUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    def get_object(self):
        return self.request.user 

    @swagger_auto_schema(request_body=UpdateUserSerializer)
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

class UserDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user  

    def destroy(self, request, *args, **kwargs):
        self.get_object().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)