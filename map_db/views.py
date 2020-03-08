from .models import Location, Route
from .serializers import LocationSerializer, RouteSerializer
from rest_framework import generics


class LocationListCreate(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class RouteListCreate(generics.ListCreateAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer


# # from .serializers import PostSerializer
# # from .models import Post
# from .models import Location, Route
# from .serializers import LocationSerializer, RouteSerializer
# from rest_framework.views import APIView
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.response import Response
# from rest_framework import status
# # Create your views here.


# class LocationListCreate(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def get(self, request, *args, **kwargs):
#         locations = Location.objects.all()
#         serializer = LocationSerializer(locations, many=True)
#         return Response(serializer.data)

#     def post(self, request, *args, **kwargs):
#         locations_serializer = LocationSerializer(data=request.data)
#         if locations_serializer.is_valid():
#             locations_serializer.save()
#             return Response(locations_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print('error', locations_serializer.errors)
#             return Response(locations_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class RouteListCreate(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def get(self, request, *args, **kwargs):
#         routes = Route.objects.all()
#         serializer = RouteSerializer(routes, many=True)
#         return Response(serializer.data)

#     def post(self, request, *args, **kwargs):
#         routes_serializer = RouteSerializer(data=request.data)
#         if routes_serializer.is_valid():
#             routes_serializer.save()
#             return Response(routes_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print('error', routes_serializer.errors)
#             return Response(routes_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
