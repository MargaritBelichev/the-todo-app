import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import TodoLists from './components/TodoLists'
import Todos from './components/Todos'

const AppWrapper = () => {
  let id = 321
  return <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Todo Lists</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/todos/:id">
          <Todos />
        </Route>
        <Route path="/">
          <TodoLists />
        </Route>
      </Switch>
    </div>
  </Router>
}


export default AppWrapper
