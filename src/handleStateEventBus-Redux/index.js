import { appView, todosView, counterView, filtersView } from "./view/index.js";
import { renderRoot, add } from "./resistry.js";
import applyDiff from "./applyDiff.js";

import reducer from "./model/reducer.js";

// Todo: 'data-component' key 정리
add("app", appView);
add("todos", todosView);
add("counter", counterView);
add("filters", filtersView);

const INITIAL_STATE = {
  todos: [],
  currentFilter: "All",
};

const { createStore } = Redux;

const store = createStore(
  reducer,
  INITIAL_STATE,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = renderRoot(main, store.getState(), store.dispatch);

    applyDiff(document.body, main, newMain);
  });
};

store.subscribe(render);

render();
