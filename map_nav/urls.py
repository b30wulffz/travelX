from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home),
    path('add/', views.add_data)
]
