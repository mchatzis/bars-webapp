from django.db import models

class Bar(models.Model):
    longitude = models.DecimalField("Longitude", max_digits=6, decimal_places=5)
    latitude = models.DecimalField("Latitude", max_digits=6, decimal_places=5)