
from django.db import models


class Location(models.Model):
    place = models.CharField(max_length=60)
    latitude = models.DecimalField(max_digits=20, decimal_places=7)
    longitude = models.DecimalField(max_digits=20, decimal_places=7)
    summary = models.TextField(blank=True)
    place_img = models.ImageField(
        default='default.jpg')

    def __str__(self):
        return str(self.id) + ": " + self.place


class Route(models.Model):
    src_id = models.ForeignKey(
        'Location', on_delete=models.CASCADE, related_name='tranports_from')
    dest_id = models.ForeignKey(
        'Location', on_delete=models.CASCADE, related_name='tranports_to')
    mode = models.CharField(max_length=1)
    distance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    price = models.PositiveIntegerField()

    def __str__(self):
        return str(self.id)+": " + self.source_place + " to " + self.dest_place

    @property
    def source_place(self):
        return self.src_id.place

    @property
    def dest_place(self):
        return self.dest_id.place
