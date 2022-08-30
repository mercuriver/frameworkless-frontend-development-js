import getTodos from "./getTodos.js";
// import view from "./view/index.js";

import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";

// Todo: 'data-component' key 정리
const registry = {
  todos: todosView,
  counter: counterView,
  filters: filtersView,
};

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const renderWrapper = (component) => {
  return (targetElement, state) => {
    const element = component(targetElement, state);
    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;
      const child = registry[name];

      if (!child) {
        return;
      }

      target.replaceWith(child(target, state));
    });

    return element;
  };
};

const renderRoot = (root, state) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state);
};

window.requestAnimationFrame(() => {
  const main = document.querySelector(".todoapp");
  const newMain = renderRoot(main, state);
  main.replaceWith(newMain);
});
