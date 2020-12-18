from .views import TodoListView, TodoView, StatusView, StatusDetailsView, TodoListDetailsView
from django.urls import path


urlpatterns = [
    path('', TodoListView.as_view()),
    path('<int:pk>', TodoListDetailsView.as_view()),
    path('<int:pk>/todos/', TodoView.as_view()),
    path('todos/statuses/', StatusView.as_view()),
    path('todos/statuses/<int:pk>', StatusDetailsView.as_view()),
]
