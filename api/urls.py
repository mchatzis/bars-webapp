from django.urls import path
from api.views import BarListAPIView, BarTypeListAPIView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


app_name = 'api'

urlpatterns = [
    path('bars/', BarListAPIView.as_view(), name='bars-list'),
    path('bar-types/', BarTypeListAPIView.as_view(), name='bar-types'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/doc/', SpectacularSwaggerView.as_view(url_name='api:schema'), name='schema-doc'),
]