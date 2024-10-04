from rest_framework import permissions

class IsVIPUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'vip'

    def has_object_permission(self, request, view, obj):
        return request.user == obj.creator

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff
