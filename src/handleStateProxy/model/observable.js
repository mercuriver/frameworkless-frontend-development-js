const cloneDeep = (x) => {
  return JSON.parse(JSON.stringify(x));
};

const freeze = (state) => Object.freeze(cloneDeep(state));

const observableFactory = (initialState) => {
  let listeners = [];

  const proxy = new Proxy(cloneDeep(initialState), {
    set: (target, name, value) => {
      target[name] = value;
      listeners.forEach((listener) => listener(freeze(proxy)));
      return true;
    },
  });

  proxy.addChangeListener = (callback) => {
    listeners.push(callback);
    callback(freeze(proxy));
    return () => {
      listeners = listeners.filter((listener) => listener !== callback);
    };
  };

  return proxy;
};

export default observableFactory;
