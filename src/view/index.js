const CLASS_NAME_SELETED = "selected";

import todosView from "./todos.js";

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;
  return length === 1 ? "1 Item left" : `${length} Items left`;
};

const view = (targetElement, state) => {
  const { currentFilter, todos } = state;
  const element = targetElement.cloneNode(true);

  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  counter.textContent = getTodoCount(todos);

  Array.from(filters.querySelectorAll("li a")).forEach((row) => {
    if (row.textContent === currentFilter) {
      row.classList.add(CLASS_NAME_SELETED);
    } else {
      row.classList.remove(CLASS_NAME_SELETED);
    }
  });

  list.replaceWith(todosView(list, state));

  return element;
};

export default view;
