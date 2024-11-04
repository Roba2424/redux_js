import { TODO } from "../utills/constants/constants.js";

function addTodo(text) {
  return { type: TODO.ADD_TODO, payload: text };
}

function toggleTodo(id) {
  return { type: TODO.TOGGLE_TODO, payload: id };
}

function deleteTodo(id) {
  return { type: TODO.DELETE_TODO, payload: id };
}

export { addTodo, toggleTodo, deleteTodo };
