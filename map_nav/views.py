from django.shortcuts import render
from django.core import serializers
import json

from .models import Location
# Create your views here.


def home(request):

    data = json.loads(serializers.serialize("json", Location.objects.all()))

    if request.method == 'POST':
        src = request.POST.get('src', '').strip()
        dest = request.POST.get('dest', '').strip()
        srcObj = json.loads(serializers.serialize(
            "json", [Location.objects.get(name=src)]))
        destObj = json.loads(serializers.serialize(
            "json", [Location.objects.get(name=dest)]))
        return render(request, 'map_nav/index.html', {"data": data, "srcObj": srcObj, "destObj": destObj})

    return render(request, 'map_nav/index.html', {"data": data, "srcObj": None, "destObj": None})


def add_data(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        lat = float(request.POST.get('lat', '0'))
        lng = float(request.POST.get('lng', '0'))
        q = Location(name=name, lat=lat, lng=lng)
        q.save()
    data = json.loads(serializers.serialize("json", Location.objects.all()))
    return render(request, 'map_nav/add_data.html', {"data": data})
