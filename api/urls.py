from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import BarViewSet
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


router = DefaultRouter()
router.register('bars', BarViewSet)

app_name = 'api'


urlpatterns = [
    path('', include(router.urls)),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/doc/', SpectacularSwaggerView.as_view(url_name='api:schema'), name='schema-doc'),
]