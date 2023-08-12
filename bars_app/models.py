from django.db import models
import os


class BarType(models.Model):
    type = models.CharField(max_length=20, unique=True)

    def __str__(self) -> str:
        return self.type


base_dir = "bar_images"
def get_upload_path(img_type):
    def get_upload_path_inner(instance, filename):
        bar_name = instance.title
        path = os.path.join(base_dir, bar_name, img_type)
        print(path)
        return path
    return get_upload_path_inner

class Bar(models.Model):
    feature_type = models.CharField(max_length=20, choices=[("Point","Point")], default="Point")
    longitude = models.DecimalField("Longitude", max_digits=10, decimal_places=6)
    latitude = models.DecimalField("Latitude", max_digits=10, decimal_places=6)
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=120, blank=True)
    bar_type = models.ManyToManyField(BarType)
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    tiny_thumbnail = models.ImageField(upload_to=get_upload_path('tiny_thumbnail'), blank=True, null=True)
    thumbnail = models.ImageField(upload_to=get_upload_path('thumbnail'), blank=True, null=True)
    image1 = models.ImageField(upload_to=get_upload_path('image1'), blank=True, null=True)
    image2 = models.ImageField(upload_to=get_upload_path('image2'), blank=True, null=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ["last_modified"]