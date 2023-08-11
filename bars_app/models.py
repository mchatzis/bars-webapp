from django.db import models


class BarType(models.Model):
    type = models.CharField(max_length=20, unique=True)

    def __str__(self) -> str:
        return self.type


def get_upload_path(instance, _):
    # print(instance.__dict__)
    return "test_dir_images/" + "test.png"

class Bar(models.Model):
    feature_type = models.CharField(max_length=20, choices=[("Point","Point")], default="Point")
    longitude = models.DecimalField("Longitude", max_digits=10, decimal_places=6)
    latitude = models.DecimalField("Latitude", max_digits=10, decimal_places=6)
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=120, blank=True)
    bar_type = models.ManyToManyField(BarType)
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    tiny_thumbnail = models.ImageField(upload_to=get_upload_path, blank=True, null=True)
    thumbnail = models.ImageField(upload_to=get_upload_path, blank=True, null=True)
    image1 = models.ImageField(upload_to=get_upload_path, blank=True, null=True)
    image2 = models.ImageField(upload_to=get_upload_path, blank=True, null=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ["last_modified"]