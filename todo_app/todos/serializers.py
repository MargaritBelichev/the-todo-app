from rest_framework import serializers
from todos.models import TodoList, Status, Todo


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('name')


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'note', 'status', 'createdAt')
        # depth = 1

    def create(self, validated_data, todoList, status):
        validated_data['todoList'] = todoList
        validated_data['status'] = status
        return Todo.objects.create(**validated_data)


class TodoListMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ('id', 'listName', 'owner', 'isSuccessful')
        # depth = 1
