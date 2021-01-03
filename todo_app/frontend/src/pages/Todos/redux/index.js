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
