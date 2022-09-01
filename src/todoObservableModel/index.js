import { appView, todosView, counterView, filtersView } from "./view/index.js";
import { renderRoot, add } from "./resistry.js";
import applyDiff from "./applyDiff.js";

import modelFactory from "./model/model.js";

// Todo: 'data-component' key 정리
add("app", appView);
add("todos", todosView);
add("counter", counterView);
add("filters", filtersView);

const { addChangeListener, ...events } = modelFactory();

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

addChangeListener(render);
