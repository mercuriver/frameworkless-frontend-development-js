const registry = {};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderWrapper = (component) => {
  return (targetElement, state, events) => {
    const element = component(targetElement, state, events);
    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;
      const child = registry[name];

      if (!child) {
        return;
      }

      target.replaceWith(child(target, state, events));
    });

    return element;
  };
};

const renderRoot = (root, state, events) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export { renderRoot, add };
