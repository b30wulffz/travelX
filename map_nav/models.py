from django.db import models

# Create your models here.


class Location(models.Model):
    name = models.CharField(max_length=200)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('lat', 'lng',)
