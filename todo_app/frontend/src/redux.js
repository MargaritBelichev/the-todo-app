import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const initialState = {
  todoLists: [],
  selectedTodoList: null,
  todos: [],
  notifications: [],
  tokens: {
    access: '',
    refresh: ''
  }
};

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

store.subscribe( () => {});
// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    // TodoList
    case 'SET_TODO_LISTS':
      return {
        ...state,
        todoLists: action.payload
      };
    case 'ADD_TODO_LIST':
      return {
        ...state,
        todoLists: [...state.todoLists, action.payload]
      };
    case 'REMOVE_TODO_LIST':
      return {
        ...state,
        todoLists: state.todoLists.filter((todoList) => todoList.id !== action.payload)
      };
    // Todos
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    case 'SET_TOKENS':
      return {
        ...state,
        tokens: action.payload
      };
    case 'RESET_TOKENS':
      return {
        ...state,
        tokens: {
          access: '',
          refresh: ''
        }
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.payload)
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    default:
      return state;
  }
}
