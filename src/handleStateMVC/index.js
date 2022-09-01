import { appView, todosView, counterView, filtersView } from "./view/index.js";
import { renderRoot, add } from "./resistry.js";
import applyDiff from "./applyDiff.js";

import modelFactory from "./model/model.js";

// Todo: 'data-component' key 정리
add("app", appView);
add("todos", todosView);
add("counter", counterView);
add("filters", filtersView);

const model = modelFactory();

const events = {
  addItem: (text) => {
    model.addItem(text);
    render(model.getState());
  },
  updateItem: (index, text) => {
    model.updateItem(index, text);
    render(model.getState());
  },
  deleteItem: (index) => {
    model.deleteItem(index);
    render(model.getState());
  },
  toggleItemCompleted: (index) => {
    model.toggleItemCompleted(index);
    render(model.getState());
  },
  completeAll: () => {
    model.completeAll();
    render(model.getState());
  },
  clearCompleted: () => {
    model.clearCompleted();
    render(model.getState());
  },
  changeFilter: (filter) => {
    model.changeFilter(filter);
    render(model.getState());
  },
};

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

render(model.getState());
