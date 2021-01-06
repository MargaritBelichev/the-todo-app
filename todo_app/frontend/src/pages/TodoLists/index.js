import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import {
  fetchTodoListsAction,
  addTodoListsAction,
  removeTodoListsAction,
  toggleSuccessfulTodoListAction
} from './redux';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, Container, Checkbox } from '@material-ui/core';
import { Save, Delete } from '@material-ui/icons';


const TodoLists = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodoListsAction());
  }, [])

  const todoLists = useSelector((state = {}) => state.todoLists);
  const [newTodoListName, setNewTodoListName] = useState('')
  const _onSubmit = event => {
    event.preventDefault();
    dispatch(addTodoListsAction(newTodoListName));
    setNewTodoListName('');
  };

  return <div className='TodoLists'>
    <h1 className='header'>Todo Lists</h1>
    <ul>
    <form onSubmit={_onSubmit}>
      <TextField
        label='Todo List Name'
        name="listName"
        value={newTodoListName}
        onChange={(event) => setNewTodoListName(event.target.value)}
      />
      <Button variant="contained" color="primary" type='submit'> <Save/>Save </Button>
    </form>
      {todoLists.map((list) => {
        return <Container key={list.id}>
          <li>
            <div className='todo-list-details'>
              <Checkbox
                label='Successful'
                checked={list.isSuccessful}
                onChange={() => dispatch(toggleSuccessfulTodoListAction(list))}
              />
              <Link to={`/todos/${list.id}`}><h4>{list.listName}</h4></Link>
            </div>
            <span onClick={() => dispatch(removeTodoListsAction(list.id))}><Delete color="secondary"/></span>
          </li>
        </Container>
      })}
    </ul>
  </div>
}

export default TodoLists
