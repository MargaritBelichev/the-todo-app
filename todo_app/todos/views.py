from rest_framework import generics, response, status, permissions
from django.shortcuts import get_object_or_404
from .serializers import TodoSerializer, TodoListMetaSerializer, StatusSerializer
from .models import  TodoList, Status, Todo

from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User


class StatusDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]


class StatusView(generics.ListCreateAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]


class TodoListDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListMetaSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        Todo.objects.filter(todoList=kwargs['pk']).delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class TodoListView(generics.ListCreateAPIView):
    serializer_class = TodoListMetaSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        token = self.request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        auth_class_instance = JWTAuthentication()
        validated_token = auth_class_instance.get_validated_token(token)
        user = auth_class_instance.get_user(validated_token)
        return TodoList.objects.filter(owner=user)

    def create(self, request, *args, **kwargs):
        token = self.request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        auth_class_instance = JWTAuthentication()
        validated_token = auth_class_instance.get_validated_token(token)
        user = auth_class_instance.get_user(validated_token)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.create(serializer.data, owner=user)
        response_body = TodoListMetaSerializer(new_instance)
        return response.Response(response_body.data, status=status.HTTP_201_CREATED)


class TodoView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        todoListId = self.kwargs['pk']
        return Todo.objects.filter(todoList=todoListId)

    def list(self, request, pk):
        queryset = self.get_queryset()
        serializer = TodoSerializer(queryset, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        todoList = get_object_or_404(TodoList, id=kwargs['pk'])
        todo_status = get_object_or_404(Status, id=serializer.data['status'])
        new_instance = serializer.create(serializer.data, todoList=todoList, status=todo_status)
        headers = self.get_success_headers(serializer.data)
        response_body = TodoSerializer(new_instance)
        return response.Response(response_body.data, status=status.HTTP_201_CREATED)


class TodoDetailsView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        todo_id = self.kwargs['pk']
        return Todo.objects.filter(id=todo_id)
