import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';

import AppWrapper from './AppWrapper';
import UserAuthentication from './UserAuthentication';

const App = () => {
  return <Provider store={store}>
    <UserAuthentication>
      <AppWrapper/>
    </UserAuthentication>
  </Provider>
}

export default App
