from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import BarViewSet


router = DefaultRouter()
router.register('bars', BarViewSet)

app_name = 'api'

urlpatterns = [
    path('', include(router.urls))
]
