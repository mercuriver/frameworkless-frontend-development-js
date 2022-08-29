const CLASS_NAME_SELETED = "selected";

import todosView from "./todos.js";
import counterView from "./counter.js";

const view = (targetElement, state) => {
  const { currentFilter, todos } = state;
  const element = targetElement.cloneNode(true);

  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  Array.from(filters.querySelectorAll("li a")).forEach((row) => {
    if (row.textContent === currentFilter) {
      row.classList.add(CLASS_NAME_SELETED);
    } else {
      row.classList.remove(CLASS_NAME_SELETED);
    }
  });

  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));

  return element;
};

export default view;
