import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';

import AppWrapper from './AppWrapper'

const App = () => {
  return <Provider store={store}>
    <AppWrapper/>
  </Provider>
}

export default App
