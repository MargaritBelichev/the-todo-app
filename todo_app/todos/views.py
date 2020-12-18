from rest_framework import generics, response
from django.shortcuts import get_object_or_404
from .serializers import TodoSerializer, TodoListMetaSerializer, StatusSerializer
from .models import  TodoList, Status, Todo


class StatusDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    authentication_classes = []
    permission_classes = []


class StatusView(generics.ListCreateAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    authentication_classes = []
    permission_classes = []


class TodoListDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListMetaSerializer
    authentication_classes = []
    permission_classes = []


class TodoListView(generics.ListCreateAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListMetaSerializer
    authentication_classes = []
    permission_classes = []


class TodoView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self):
        todoListId = self.kwargs['pk']
        return Todo.objects.filter(todoList=todoListId)

    def list(self, request, pk):
        queryset = self.get_queryset()
        serializer = TodoSerializer(queryset, many=True)
        return response.Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        todoList = get_object_or_404(TodoList, id=kwargs['pk'])
        status = get_object_or_404(Status, id=serializer.data['status'])
        serializer.create(serializer.data, todoList=todoList, status=status)
        headers = self.get_success_headers(serializer.data)
        return response.Response(serializer.data)
