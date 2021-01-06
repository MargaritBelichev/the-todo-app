from rest_framework import serializers
from todos.models import TodoList, Status, Todo


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('id', 'name',)


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'note', 'status', 'createdAt')

    def create(self, validated_data, todoList, status):
        validated_data['todoList'] = todoList
        validated_data['status'] = status
        return Todo.objects.create(**validated_data)


class TodoListMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ('id', 'listName', 'owner', 'isSuccessful', 'createdAt')

    def create(self, validated_data, owner):
        validated_data['owner'] = owner
        return TodoList.objects.create(**validated_data)
