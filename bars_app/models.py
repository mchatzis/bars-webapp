from django.db import models


class BarType(models.Model):
    type = models.CharField(max_length=20, unique=True)

    def __str__(self) -> str:
        return self.type

class Bar(models.Model):
    feature_type = models.CharField(max_length=20, choices=[("Point","Point")], default="Point")
    longitude = models.DecimalField("Longitude", max_digits=10, decimal_places=6)
    latitude = models.DecimalField("Latitude", max_digits=10, decimal_places=6)
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=120, blank=True)
    image_url = models.URLField(null=True, blank=True)
    bar_type = models.ManyToManyField(BarType)
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ["last_modified"]




