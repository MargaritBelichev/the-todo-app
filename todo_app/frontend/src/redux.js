import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

const getRequestHeaders = () => {
  const token = store.getState().tokens.access;
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}

const initialState = {
  todoLists: [],
  selectedTodoList: null,
  todos: [],
  tokens: {
    access: '',
    refresh: ''
  }
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
    case 'SET_TOKENS':
      return {
        ...state,
        tokens: action.payload
      };
    case 'RESET_TOKENS':
      return {
        ...state,
        tokens: {
          access: '',
          refresh: ''
        }
      };
    default:
      return state;
  }
}
// Actions

// Helpers
const getAccessTokenRefreshTimer = (expires) => {
  // NOTE: multiplying by 1000 b/c "expires" is a UNIX timestamp
  // NOTE: refreshing the token 2 min before it expires ( - 120000)
  return ((expires * 1000) - Date.now()) - 120000
}


// TodoList
export function fetchTodoListsAction() {
  return (dispatch) => {
    axios.get('/api/todolists/', getRequestHeaders())
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
    axios.post('/api/todolists/', body, getRequestHeaders())
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
    axios.delete(`/api/todolists/${todoListId}`, getRequestHeaders())
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
    axios.get(`/api/todolists/${todoListId}/todos/`, getRequestHeaders())
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
    axios.post(`/api/todolists/${todoListId}/todos/`, body, getRequestHeaders())
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
    axios.delete(`/api/todolists/${todoListId}/todos/${todoId}`, getRequestHeaders())
    .then(function (response) {
      dispatch({type: 'REMOVE_TODO', payload: todoId});
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}
// Login
export const loginUserAction = userCredentials => {
  return dispatch => {
    axios.post('/api/auth/token', userCredentials)
    .then( response => {
      const accessTokenConfig = jwtDecode(response.data.access);
      setTimeout(() => dispatch(refreshAccessTokenAction()), getAccessTokenRefreshTimer(accessTokenConfig.exp))
      dispatch({type: 'SET_TOKENS', payload: response.data});
      Cookie.set('refreshToken', response.data.refresh);
    })
    .catch( error => {
      console.log(error);
    })
  }
}

export const refreshAccessTokenAction = () => {
  return dispatch => {
    const tokenObject = {refresh: Cookie.get('refreshToken')};
    axios.post('/api/auth/token/refresh', tokenObject)
    .then( response => {
      const accessTokenConfig = jwtDecode(response.data.access);
      const payload = {
        access: response.data.access,
        refresh: store.getState().tokens.refresh
      }
      setTimeout(() => dispatch(refreshAccessTokenAction()), getAccessTokenRefreshTimer(accessTokenConfig.exp))
      dispatch({type: 'SET_TOKENS', payload});
    })
    .catch( error => {
      console.log(error);
    })
  }
}

export const logoutUserAction = (dispatch) => {
  Cookie.remove('refreshToken');
  dispatch({type: 'RESET_TOKENS'});
}
