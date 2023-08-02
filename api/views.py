from rest_framework.viewsets import ModelViewSet
from api.serializers import BarSerializer
from bars_app.models import Bar


class BarViewSet(ModelViewSet):
    serializer_class = BarSerializer
    queryset = Bar.objects.filter(bar_type=2)