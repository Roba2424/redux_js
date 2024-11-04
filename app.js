import { addTodo, deleteTodo, toggleTodo } from "./state-management/action.js";
import { store } from "./state-management/store.js";
import { handleButton } from "./utills/functions/function.js";

const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

function render() {
  const state = store.getState();
  todoList.innerHTML = "";

  state.todos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.className = `todo-item ${todo.completed ? "completed" : ""}`;
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;

    const toggleButton = handleButton({
      textContent: todo.completed ? "Uncheck" : "Check",
      className: "toggle-btn",
      handleTask: () => toggleTask(todo.id),
    });

    const deleteButton = handleButton({
      textContent: "Delete",
      className: "delete-btn",
      handleTask: () => deleteTask(todo.id),
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(toggleButton);
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(textSpan);
    listItem.appendChild(buttonContainer);
    todoList.appendChild(listItem);
  });
}

addTodoBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text) {
    store.dispatch(addTodo(text));
    todoInput.value = "";
  }
});

function toggleTask(id) {
  store.dispatch(toggleTodo(id));
}

function deleteTask(id) {
  store.dispatch(deleteTodo(id));
}

store.subscribe(render);
render();
