import React, { useEffect } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import Cookie from 'js-cookie';
import { refreshAccessTokenAction, logoutUserAction } from './redux';
import { Fab, Tooltip } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

import Login from './Login';


const UserAuthentication = (props) => {
  const tokens = useSelector((state) => state.tokens)
  const dispatch = useDispatch();
  useEffect(() => {
    if(Cookie.get('refreshToken')) {
      dispatch(refreshAccessTokenAction());
    }
  }, []);

  return <div className='UserAuthentication'>
    {
    tokens.access ?
    <>
      <Tooltip title="Logout">
        <Fab className='logout-button' color='secondary' onClick={() => dispatch(logoutUserAction)}>
          <ExitToApp/>
        </Fab>
      </Tooltip>
      {props.children}
    </>
    : <Login/>
    }
  </div>
}

export default UserAuthentication
