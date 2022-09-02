import { appView, todosView, counterView, filtersView } from "./view/index.js";
import { renderRoot, add } from "./resistry.js";
import applyDiff from "./applyDiff.js";

import eventBusFactory from "./model/eventBus.js";
import modelFactory from "./model/model.js";

// Todo: 'data-component' key 정리
add("app", appView);
add("todos", todosView);
add("counter", counterView);
add("filters", filtersView);

const model = modelFactory();
const eventBus = eventBusFactory(model);

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = renderRoot(main, state, eventBus.dispatch);

    applyDiff(document.body, main, newMain);
  });
};

eventBus.subscribe(render);

render(eventBus.getState());
