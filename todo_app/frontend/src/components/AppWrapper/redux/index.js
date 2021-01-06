import axios from 'axios';
import { getRequestHeaders } from '../../../helpers/request';
import { addErrorNotificationAction } from '../../../helpers/notifications';


export const initApplicationAction = () => {
  return (dispatch) => {
    axios.get(`/api/todolists/todos/statuses/`, getRequestHeaders())
    .then(function (response) {
      dispatch({type: 'SET_STATUSES', payload: response.data});
    })
    .catch(function (error) {
      dispatch(addErrorNotificationAction(error.response));
    })
  }
}
