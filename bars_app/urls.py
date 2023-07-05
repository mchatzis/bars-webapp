from django.urls import path
from bars_app.views import HomeView


app_name = "bars_app"

urlpatterns = [
    path("", HomeView.as_view(), name='home')
]
