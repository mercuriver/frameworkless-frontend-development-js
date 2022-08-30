import getTodos from "./getTodos.js";

import { todosView, counterView, filtersView } from "./view/index.js";
import { renderRoot, add } from "./resistry.js";
import applyDiff from "./applyDiff.js";

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

// Todo: 'data-component' key 정리
add("todos", todosView);
add("counter", counterView);
add("filters", filtersView);

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(".todoapp");
    const newMain = renderRoot(main, state);
    applyDiff(document.body, main, newMain);
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 2000);

render();
