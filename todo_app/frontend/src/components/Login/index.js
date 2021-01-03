import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAction } from './redux';


const Login = (props) => {
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({username: '', password: ''});

  return <div className={'login-wrapper'}>
    <input
      placeholder={'Enter Username'}
      type={'text'}
      value={userCredentials.username}
      onChange={ event => {
        const { password } = userCredentials
        setUserCredentials({username: event.target.value, password});
      }}
    />
    <input
      placeholder={'Enter Password'}
      type={'password'}
      value={userCredentials.password}
      onChange={ event => {
        const { username } = userCredentials
        setUserCredentials({username, password: event.target.value});
      }}
    />
    <button onClick={() => dispatch(loginUserAction(userCredentials))}>Login</button>
  </div>
}

export default Login
