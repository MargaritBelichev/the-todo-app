import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTodosAction, addTodoAction, removeTodoAction } from '../redux';
import { useSelector, useDispatch } from 'react-redux';


const Todos = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosAction(id));
  }, [])

  const todos = useSelector((state) => state.todos);
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodoNote, setNewTodoNote] = useState('');

  return  <div>
    <h1>Todos</h1>
    <input
      placeholder={'Enter Todo Name'}
      value={newTodoName}
      onChange={(event) => setNewTodoName(event.target.value)}
    />
    <input
      placeholder={'Enter Todo Note'}
      value={newTodoNote}
      onChange={(event) => setNewTodoNote(event.target.value)}
    />
    <button onClick={() => {
      dispatch(addTodoAction(id, newTodoName, newTodoNote));
      setNewTodoName('');
      setNewTodoNote('');
    }}>Add New</button>
    <ul>
      {todos.map((todo) => {
        return <li key={todo.id}>
          <h4>{todo.title}</h4>
          <span onClick={() => dispatch(removeTodoAction(id, todo.id))}>X</span>
        </li>
      })}
    </ul>
  </div>
}

export default Todos
