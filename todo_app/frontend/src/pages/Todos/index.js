import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
  fetchTodosAction,
  addTodoAction,
  removeTodoAction,
  fetchTodoListDetailsAction,
  updateTodoAction
} from './redux';
import { useSelector, useDispatch } from 'react-redux';
import { Fab, Button, TextField, Container, Tooltip, Checkbox, FormControlLabel } from '@material-ui/core';
import { ArrowBack, Save, Delete } from '@material-ui/icons';


const Todos = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosAction(id));
    dispatch(fetchTodoListDetailsAction(id));
  }, [])

  const todos = useSelector((state) => state.todos);
  const statuses = useSelector((state) => state.statuses);
  const todoList = useSelector((state) => state.activeTodoList);
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodoNote, setNewTodoNote] = useState('');
  const _onSubmit = event => {
    event.preventDefault();
    dispatch(addTodoAction(id, newTodoName, newTodoNote));
    setNewTodoName('');
    setNewTodoNote('');
  };

  return  <div className='Todos'>
    <div className="todos-header">
      <Tooltip title="Back to Todo Lists">
        <Link className="back-link" to="/"><ArrowBack /></Link>
      </Tooltip>
      <h1 className='header'>{todoList? todoList.listName : 'Loading...'}</h1>
    </div>
    <ul>
      <form onSubmit={_onSubmit}>
        <TextField
          label='Todo Name'
          value={newTodoName}
          onChange={(event) => setNewTodoName(event.target.value)}
        />
        <TextField
          label='Todo Note'
          value={newTodoNote}
          onChange={(event) => setNewTodoNote(event.target.value)}
        />
        <Button variant="contained" color="primary" type='submit'><Save/> Save</Button>
      </form>
      {todos.map((todo) => {
        return <Container key={todo.id}>
          <li>
            <div className='todo-wrapper'>
              <div className='todo-details'>
                <h4>{todo.title}</h4>
                <p>{todo.note}</p>
              </div>
              <div className='todo-status-form'>
                {statuses.map(status => {
                  return <FormControlLabel
                    key={status.id}
                    control={
                      <Checkbox
                        color='primary'
                        checked={todo.status === status.id}
                        onChange={() => dispatch(updateTodoAction(todoList.id, todo, status.id))}
                     />
                    }
                    label={status.name}
                  />
                })}
              </div>
            </div>
            <span onClick={() => dispatch(removeTodoAction(id, todo.id))}><Delete color="secondary"/></span>
          </li>
        </Container>
      })}
    </ul>
  </div>
}

export default Todos
