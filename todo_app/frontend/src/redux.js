import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const uuid = () => {
  return 1
}

const initialState = {
  todoLists: [],
  selectedTodoList: null,
  todos: []
};

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

store.subscribe( () => {});
// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    // TodoList
    case 'SET_TODO_LISTS':
      return {
        ...state,
        todoLists: action.payload
      };
    case 'ADD_TODO_LIST':
      return {
        ...state,
        todoLists: [...state.todoLists, action.payload]
      };
    case 'REMOVE_TODO_LIST':
      return {
        ...state,
        todoLists: state.todoLists.filter((todoList) => todoList.id !== action.payload)
      };
    // Todos
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    default:
      return state;
  }
}
// Actions
// TodoList
export function fetchTodoListsAction() {
  return (dispatch) => {
    axios.get('/api/todolists/')
    .then(function (response) {
      dispatch({type: 'SET_TODO_LISTS', payload: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export function addTodoListsAction(newTodoListName) {
  return (dispatch) => {
    const body = {
      listName: newTodoListName,
      owner: 1,
      isSuccessful: false
    }
    axios.post('/api/todolists/', body)
    .then(function (response) {
      dispatch({type: 'ADD_TODO_LIST', payload: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export function removeTodoListsAction(todoListId) {
  return (dispatch) => {
    axios.delete(`/api/todolists/${todoListId}`)
    .then(function (response) {
      dispatch({type: 'REMOVE_TODO_LIST', payload: todoListId});
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}
// Todos
export function fetchTodosAction(todoListId) {
  return (dispatch) => {
    axios.get(`/api/todolists/${todoListId}/todos/`)
    .then(function (response) {
      dispatch({type: 'SET_TODOS', payload: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export function addTodoAction(todoListId, newTodoName, newTodoNote) {
  return (dispatch) => {
    const body = {
      title: newTodoName,
      note: newTodoNote,
      status: 2
    }
    axios.post(`/api/todolists/${todoListId}/todos/`, body)
    .then(function (response) {
      dispatch({type: 'ADD_TODO', payload: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export function removeTodoAction(todoListId, todoId) {
  return (dispatch) => {
    axios.delete(`/api/todolists/${todoListId}/todos/${todoId}`)
    .then(function (response) {
      dispatch({type: 'REMOVE_TODO', payload: todoId});
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}
