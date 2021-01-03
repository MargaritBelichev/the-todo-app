import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodoListsAction, addTodoListsAction, removeTodoListsAction } from './redux';
import { useSelector, useDispatch } from 'react-redux';


const TodoLists = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodoListsAction());
  }, [])

  const todoLists = useSelector((state = {}) => state.todoLists);
  const [newTodoListName, setNewTodoListName] = useState('')

  return <div>
    <h1>Todo Lists</h1>
    <input
      value={newTodoListName}
      onChange={(event) => setNewTodoListName(event.target.value)}
    />
    <button onClick={() => {
      dispatch(addTodoListsAction(newTodoListName));
      setNewTodoListName('');
    }}>Add New</button>
    <ul>
      {todoLists.map((list) => {
        return <li key={list.id}>
          <Link to={`/todos/${list.id}`}>{list.listName}</Link>
          <span onClick={() => dispatch(removeTodoListsAction(list.id))}>X</span>
        </li>
      })}
    </ul>
  </div>
}

export default TodoLists
