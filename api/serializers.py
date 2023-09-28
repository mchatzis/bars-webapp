from rest_framework.serializers import ModelSerializer
from rest_framework.fields import ImageField
from bars_app.models import Bar, BarType

class BarSerializer(ModelSerializer):
    tiny_thumbnail = ImageField(use_url=False)
    thumbnail = ImageField(use_url=False)
    image1 = ImageField(use_url=False)
    image2 = ImageField(use_url=False)
    image3 = ImageField(use_url=False)
    image4 = ImageField(use_url=False)
    image5 = ImageField(use_url=False)
    
    class Meta:
        model=Bar
        fields='__all__'

class BarTypeSerializer(ModelSerializer):
    class Meta:
        model=BarType
        fields='__all__'