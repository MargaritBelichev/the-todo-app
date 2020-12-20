from .views import TodoListView, TodoView, StatusView, StatusDetailsView, TodoListDetailsView, TodoDetailsView
from django.urls import path


urlpatterns = [
    path('', TodoListView.as_view()),
    path('<int:pk>', TodoListDetailsView.as_view()),
    path('<int:pk>/todos/', TodoView.as_view()),
    path('<int:todo_list_pk>/todos/<int:pk>', TodoDetailsView.as_view()),
    path('todos/statuses/', StatusView.as_view()),
    path('todos/statuses/<int:pk>', StatusDetailsView.as_view()),
]
