import axios from 'axios';
import { getRequestHeaders } from '../../../helpers/request';
import { addErrorNotificationAction } from '../../../helpers/notifications';


export function fetchTodosAction(todoListId) {
  return (dispatch) => {
    axios.get(`/api/todolists/${todoListId}/todos/`, getRequestHeaders())
    .then(function (response) {
      dispatch({type: 'SET_TODOS', payload: response.data});
    })
    .catch(function (error) {
      dispatch(addErrorNotificationAction(error.response));
    })
  }
}

export const fetchTodoListDetailsAction = todoListId => {
  return (dispatch) => {
    axios.get(`/api/todolists/${todoListId}`, getRequestHeaders())
    .then(function (response) {
      dispatch({type: 'SET_ACTIVE_TODO_LIST', payload: response.data});
    })
    .catch(function (error) {
      dispatch(addErrorNotificationAction(error.response));
    })
  }
}

export function addTodoAction(todoListId, newTodoName, newTodoNote) {
  return (dispatch, getState) => {
    const body = {
      title: newTodoName,
      note: newTodoNote,
      status: getState().statuses[0].id
    }
    axios.post(`/api/todolists/${todoListId}/todos/`, body, getRequestHeaders())
    .then(function (response) {
      dispatch({type: 'ADD_TODO', payload: response.data});
    })
    .catch(function (error) {
      dispatch(addErrorNotificationAction(error.response));
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
      dispatch(addErrorNotificationAction(error.response));
    })
  }
}

export const updateTodoAction = (todoListId, todo, statusId) => {
  return (dispatch) => {
    todo.status = statusId;
    axios.put(`/api/todolists/${todoListId}/todos/${todo.id}`, todo, getRequestHeaders())
    .then(function (response) {
      dispatch({type: 'UPDATE_TODO', payload: response.data});
    })
    .catch(function (error) {
      dispatch(addErrorNotificationAction(error.response));
    })
  }
}
