import React, { useEffect } from 'react';
import './styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { initApplicationAction } from './redux';


import TodoLists from '../../pages/TodoLists';
import Todos from '../../pages/Todos';

const AppWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initApplicationAction());
  }, []);

  return <Router>
    <div className='AppWrapper'>
      <main className='active-component'>
        <Switch>
          <Route path="/todos/:id">
            <Todos />
          </Route>
          <Route path="/">
            <TodoLists />
          </Route>
        </Switch>
      </main>
    </div>
  </Router>
}


export default AppWrapper
