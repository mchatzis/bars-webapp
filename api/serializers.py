from rest_framework.serializers import ModelSerializer
from bars_app.models import Bar, BarTypes

class BarSerializer(ModelSerializer):
    class Meta:
        model=Bar
        fields=['feature_type', 'longitude', 'latitude', 'title', 'description', 'image_url']

class BarTypesSerializer(ModelSerializer):
    class Meta:
        model=BarTypes
        fields='__all__'