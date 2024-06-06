from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    #path("admin/", admin.site.urls),
    path("", include('django.contrib.auth.urls')),
    path("", include('bars_app.urls')),
    path("api/", include('api.urls')),
]