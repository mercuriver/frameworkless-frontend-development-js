import { appView, todosView, counterView, filtersView } from "./view/index.js";
import { renderRoot, add } from "./resistry.js";
import applyDiff from "./applyDiff.js";

import modelFactory from "./model/model.js";

// Todo: 'data-component' key 정리
add("app", appView);
add("todos", todosView);
add("counter", counterView);
add("filters", filtersView);

const loadState = () => {
  const serializedState = window.localStorage.getItem("state");

  if (!serializedState) {
    return;
  }

  return JSON.parse(serializedState);
};

const { addChangeListener, ...events } = modelFactory(loadState());

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

addChangeListener(render);

addChangeListener((state) => {
  Promise.resolve().then(() => {
    window.localStorage.setItem("state", JSON.stringify(state));
  });
});

addChangeListener((state) => {
  console.log(`Current State (${new Date().getTime()})`, state);
});
