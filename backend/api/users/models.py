from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('regular', 'Regular'),
        ('vip', 'VIP'),
        ('admin', 'Admin'),
    ]
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    subscriptions = models.ManyToManyField(
        'self', 
        symmetrical=False, 
        related_name='subscribed_users',  
        blank=True
    )

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions '
                  'granted to each of their groups.'
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.'
    )

    def __str__(self):
        return self.email

class Subscription(models.Model):
    user = models.ForeignKey(
        User, 
        related_name='subscriptions_list',  
        on_delete=models.CASCADE
    )
    subscriber = models.ForeignKey(
        User, 
        related_name='subscribers',  
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ('user', 'subscriber')
