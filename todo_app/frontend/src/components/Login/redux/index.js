import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import { getAccessTokenRefreshTimer } from '../../../helpers/authentication';
import { addErrorNotificationAction } from '../../../helpers/notifications';


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
      dispatch(addErrorNotificationAction(error.response));
    })
  }
}
