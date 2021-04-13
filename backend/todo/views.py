from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView

from .models import Todo
from .serializers import TodoSerializer

class ListTodoView(ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class CreateTodoView(CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class UpdateTodoView(UpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class DeleteTodoView(DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
