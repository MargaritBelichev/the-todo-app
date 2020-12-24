import React from 'react';
import { useSelector } from 'react-redux';

import Login from './Login';


const UserAuthentication = (props) => {
  const tokens = useSelector((state) => state.tokens)

  return <div className={'user-authentication'}>
    {tokens.access ? props.children : <Login/>}
  </div>
}

export default UserAuthentication
