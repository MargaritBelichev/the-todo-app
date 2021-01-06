import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAction } from './redux';
import { Button, TextField } from '@material-ui/core';


const Login = (props) => {
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({username: '', password: ''});
  const _onSubmit = event => {
    event.preventDefault();
    dispatch(loginUserAction(userCredentials));
  }

  return <div className='login-wrapper'>
    <form onSubmit={_onSubmit}>
      <TextField
        label='Username'
        type='text'
        value={userCredentials.username}
        onChange={ event => {
          const { password } = userCredentials
          setUserCredentials({username: event.target.value, password});
        }}
      />
      <TextField
        label='Password'
        type='password'
        value={userCredentials.password}
        onChange={ event => {
          const { username } = userCredentials
          setUserCredentials({username, password: event.target.value});
        }}
      />
      <Button variant="contained" color="primary" type='submit'>Login</Button>
    </form>
  </div>
}

export default Login
