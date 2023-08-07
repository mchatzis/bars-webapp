from rest_framework.generics import ListAPIView
from api.serializers import BarSerializer, BarTypeSerializer
from bars_app.models import Bar, BarType

class BarTypeListAPIView(ListAPIView):
    serializer_class = BarTypeSerializer
    queryset = BarType.objects.all()

class BarListAPIView(ListAPIView):
    serializer_class = BarSerializer

    def get_queryset(self):
        queryset = Bar.objects.all()
        bar_type_par = self.request.query_params.get('type')

        if bar_type_par is not None:
            bar_type = BarType.objects.filter(type=bar_type_par)
            if len(bar_type) == 1:
                queryset = queryset.filter(bar_type=bar_type[0])
            else:
                raise Exception("bar category not valid")
        
        return queryset