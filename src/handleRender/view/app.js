let template;

const createAppElement = () => {
  if (!template) {
    template = document.getElementById("todo-app");
  }

  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  targetElement.querySelector(".new-todo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      events.addItem(e.target.value);
      e.target.value = "";
    }
  });
};

const view = (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);

  newApp.innerHTML = "";
  newApp.appendChild(createAppElement());

  addEvents(newApp, events);

  return newApp;
};

export default view;
