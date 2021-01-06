import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import './global.css';

import AppWrapper from './components/AppWrapper';
import UserAuthentication from './components/UserAuthentication';
import Notifications from './components/Notifications';

const App = () => {
  return <Provider store={store}>
    <Notifications />
    <UserAuthentication>
      <AppWrapper/>
    </UserAuthentication>
  </Provider>
}

export default App
