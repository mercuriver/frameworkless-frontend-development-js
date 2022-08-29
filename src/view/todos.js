const getTodoElement = (todo) => {
  const { text, completed } = todo;

  return `
  <li ${completed ? 'class="completed"' : ""}>
    <div class="view">
      <input 
        ${completed ? "checked" : ""}
        class="toggle" 
        type="checkbox">
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${text}">
  </li>`;
};

const view = (targetElement, { todos }) => {
  const newTodosList = targetElement.cloneNode(true);
  newTodosList.innerHTML = todos.map(getTodoElement).join("");
  return newTodosList;
};

export default view;
