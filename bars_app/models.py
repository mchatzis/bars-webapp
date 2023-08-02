from django.db import models


class BarTypes(models.Model):
    type = models.CharField(max_length=20, unique=True)

class Bar(models.Model):
    feature_type = models.CharField(max_length=20, choices=[("Point","Point")], default="Point")
    longitude = models.DecimalField("Longitude", max_digits=8, decimal_places=6)
    latitude = models.DecimalField("Latitude", max_digits=8, decimal_places=6)
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=120)
    image_url = models.URLField(null=True)
    bar_type = models.ManyToManyField(BarTypes)
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["last_modified"]




