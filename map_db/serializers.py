from rest_framework import serializers
from .models import Location, Route


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'place', 'latitude',
                  'longitude', 'summary', 'place_img')


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('id', 'src_id', 'dest_id',
                  'mode', 'price')
