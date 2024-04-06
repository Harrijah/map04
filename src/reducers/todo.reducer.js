// reducer.js
import { DELETE_TODO, GET_TODO, POST_TODO, EDIT_TODO } from "../actions/todo.action";

const initialState = { todos: null };

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODO:
      return { todos: action.payload };
    case POST_TODO:
      return { todos: [{ id: null, ...action.payload }, ...state.todos] };
    case EDIT_TODO:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
      return { todos: updatedTodos };
    case DELETE_TODO:
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
      return { todos: filteredTodos };
    default:
      return state;
  }
}
