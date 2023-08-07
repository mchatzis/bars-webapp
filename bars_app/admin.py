from django.contrib import admin
from django.db.models.query import QuerySet
from django.http.request import HttpRequest
from .models import Bar, BarType

@admin.register(Bar)
class BarAdmin(admin.ModelAdmin):
    # Define the fields to be displayed in the admin interface
    list_display = (
        'title',
        'longitude',
        'latitude',
        'description',
        'image_url',
        'get_bartype',
        'date_created',
        'last_modified'
    )
    
    def get_bartype(self, obj):
        return ', '.join([bar_type.type for bar_type in obj.bar_type.all()])
    
    # cache bar_types to avoid quering database for each row in the table
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.prefetch_related('bar_type')


@admin.register(BarType)
class BarTypeAdmin(admin.ModelAdmin):
    # Define the fields to be displayed in the admin interface
    list_display = (
        'type',
    )