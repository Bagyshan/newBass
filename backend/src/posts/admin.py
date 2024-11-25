from django.contrib import admin
from src.posts.models import Post, Category

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    exclude = ('longitude', 'latitude',)
# admin.site.register(PostAdmin)
admin.site.register(Category)