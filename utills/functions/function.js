function handleButton({ textContent, className, handleTask }) {
  const button = document.createElement("button");
  button.textContent = textContent;
  button.className = className;
  button.addEventListener("click", handleTask);
  return button;
}

export { handleButton };
