import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import { getAccessTokenRefreshTimer } from '../../../helpers/authentication';
import { addErrorNotificationAction } from '../../../helpers/notifications';


export const refreshAccessTokenAction = () => {
  return dispatch => {
    const tokenObject = {refresh: Cookie.get('refreshToken')};
    axios.post('/api/auth/token/refresh', tokenObject)
    .then( response => {
      const accessTokenConfig = jwtDecode(response.data.access);
      const payload = {
        access: response.data.access,
        refresh: Cookie.get('refreshToken')
      }
      setTimeout(() => dispatch(refreshAccessTokenAction()), getAccessTokenRefreshTimer(accessTokenConfig.exp))
      dispatch({type: 'SET_TOKENS', payload});
    })
    .catch( error => {
      dispatch(addErrorNotificationAction(error.response));
    })
  }
}

export const logoutUserAction = (dispatch) => {
  Cookie.remove('refreshToken');
  dispatch({type: 'RESET_TOKENS'});
}
