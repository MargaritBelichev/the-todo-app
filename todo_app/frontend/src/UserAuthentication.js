import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookie from 'js-cookie';
import { refreshAccessTokenAction, logoutUserAction } from './redux';

import Login from './Login';


const UserAuthentication = (props) => {
  const tokens = useSelector((state) => state.tokens)
  const dispatch = useDispatch();
  useEffect(() => {
    if(Cookie.get('refreshToken')) {
      dispatch(refreshAccessTokenAction());
    }
  }, []);

  return <div className={'user-authentication'}>
    {
    tokens.access ?
    <div>
      <button onClick={() => dispatch(logoutUserAction)}>Logout</button>
      {props.children}
    </div>
    : <Login/>
    }
  </div>
}

export default UserAuthentication
