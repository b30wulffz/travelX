import json

from django.urls import reverse
from map_db.models import Location, Route
from map_db.serializers import LocationSerializer, RouteSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class LocationTestCase(APITestCase):

    def test_addLocation(self):
        data = {
            "place": "Unnao Bus Station",
            "latitude": 26.530377,
            "longitude": 80.5032213,
            "summary": "This bus station is located in the heart of Unnao city which connects two major cities of Uttar Pradesh i.e. Kanpur and Lucknow."
        }
        response = self.client.post("/api/location/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class RoutesTestCase(APITestCase):

    def setUp(self):
        self.loc1 = Location(
            place="Unnao Bus Station",
            latitude=26.530377,
            longitude=80.5032213,
            summary="This bus station is located in the heart of Unnao city which connects two major cities of Uttar Pradesh i.e. Kanpur and Lucknow."
        )
        self.loc1.save()

        self.loc2 = Location(
            place="Kanpur Bus Station",
            latitude=26.3544985,
            longitude=80.2999846,
            summary="This bus station is located in one of the major city of Uttar Pradesh, i.e. Kanpur"
        )
        self.loc2.save()

    def test_addRoute(self):
        data = {
            "src_id": self.loc1.id,
            "dest_id": self.loc2.id,
            "distance": 260,
            "autoPrice": 450,
            "busPrice": 300,
            "trainPrice": 180
        }
        response = self.client.post("/api/routes/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
