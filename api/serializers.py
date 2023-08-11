from rest_framework.serializers import ModelSerializer
from bars_app.models import Bar, BarType

class BarSerializer(ModelSerializer):
    class Meta:
        model=Bar
        fields='__all__'

class BarTypeSerializer(ModelSerializer):
    class Meta:
        model=BarType
        fields='__all__'