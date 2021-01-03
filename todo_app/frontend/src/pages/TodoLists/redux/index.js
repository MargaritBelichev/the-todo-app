import axios from 'axios';
import { getRequestHeaders } from '../../../helpers/request';
import { addErrorNotificationAction } from '../../../helpers/notifications';


export function fetchTodoListsAction() {
  return (dispatch) => {
    axios.get('/api/todolists/', getRequestHeaders())
    .then(function (response) {
      dispatch({type: 'SET_TODO_LISTS', payload: response.data});
    })
    .catch(function (error) {
      dispatch(addErrorNotificationAction(error.response));
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
      dispatch(addErrorNotificationAction(error.response));
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
      dispatch(addErrorNotificationAction(error.response));
    })
  }
}
