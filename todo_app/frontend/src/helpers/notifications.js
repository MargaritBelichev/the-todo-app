import { v4 as uuid } from 'uuid';


export const removeNotificationAction = (notificationId) => {
  return dispatch => {
    dispatch({type: 'REMOVE_NOTIFICATION', payload: notificationId});
  }
}

export const addErrorNotificationAction = (error) => {
  return dispatch => {
    let title = 'Error occured while performing an action.';
    if(error.data.detail) {
      title = error.data.detail;
    } else {
      title = '';
      for (var key in error.data) {
        title += `${error.data[key][0].replace('This field', key)} `
      }
    }
    dispatch({type: 'ADD_NOTIFICATION', payload: {title, id: uuid()}});
  }
}
