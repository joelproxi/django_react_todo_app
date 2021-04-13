
from django.urls import path

from . import views

urlpatterns = [
    path('list/', views.ListTodoView.as_view(), name='todo_list'),
    path('add/', views.CreateTodoView.as_view(), name='add_todo'),
    path('<pk>/update/', views.UpdateTodoView.as_view(), name='update_todo'),
    path('<pk>/delete/', views.DeleteTodoView.as_view(), name='delete_todo'),
]
