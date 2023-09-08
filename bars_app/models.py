from django.db import models
from .aws_storage import MediaStorage
from functools import partial
import os


class BarType(models.Model):
    type = models.CharField(max_length=20, unique=True)

    def __str__(self) -> str:
        return self.type


base_dir = "bar_images"
def get_upload_path(instance, filename, img_type):
    extension = os.path.splitext(filename)[1]
    bar_name = instance.title
    path = os.path.join(base_dir, bar_name, img_type + extension)
    return path

class Bar(models.Model):
    feature_type = models.CharField(max_length=20, choices=[("Point","Point")], default="Point")
    longitude = models.DecimalField("Longitude", max_digits=10, decimal_places=6)
    latitude = models.DecimalField("Latitude", max_digits=10, decimal_places=6)
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=120, blank=True)
    bar_type = models.ManyToManyField(BarType)
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    tiny_thumbnail = models.ImageField(upload_to=partial(get_upload_path,img_type='tiny_thumbnail'), blank=True, null=True, storage=MediaStorage)
    thumbnail = models.ImageField(upload_to=partial(get_upload_path,img_type='thumbnail'), blank=True, null=True, storage=MediaStorage)
    image1 = models.ImageField(upload_to=partial(get_upload_path,img_type='image1'), blank=True, null=True, storage=MediaStorage)
    image2 = models.ImageField(upload_to=partial(get_upload_path,img_type='image2'), blank=True, null=True, storage=MediaStorage)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ["last_modified"]