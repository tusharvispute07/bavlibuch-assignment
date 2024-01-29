from django.urls import path
from . import views

urlpatterns = [
    path('ngrams/', views.ngrams)
]