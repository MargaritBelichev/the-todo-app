from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class TodoList(models.Model):
    listName = models.CharField(max_length=50)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    isSuccessful = models.BooleanField(default=False)

    def __str__(self):
        return self.listName


class Status(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Todo(models.Model):
    title = models.CharField(max_length=256)
    note = models.CharField(max_length=256, default='', blank=True)
    todoList = models.ForeignKey(TodoList, on_delete=models.CASCADE, related_name='todos')
    status = models.ForeignKey(Status, on_delete=models.CASCADE, default=2)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
