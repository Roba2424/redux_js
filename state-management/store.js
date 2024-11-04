import { TODO } from "../utills/constants/constants.js";

const createStore = (reducer, initialState) => {
  let state = initialState;
  const callbacks = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    callbacks.forEach((callback) => callback());
  };

  const subscribe = (callback) => {
    callbacks.push(callback);
    return () => {
      callbacks.filter((cb) => cb !== callback);
    };
  };

  return {
    subscribe,
    getState,
    dispatch,
  };
};

function todoReducer(state, action) {
  switch (action.type) {
    case TODO.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case TODO.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case TODO.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

const initialState = { todos: [] };

export const store = createStore(todoReducer, initialState);
