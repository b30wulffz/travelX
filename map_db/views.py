from .models import Location
from .serializers import LocationSerializer
from rest_framework import generics


class LocationListCreate(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
