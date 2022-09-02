const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;
  return length === 1 ? "1 Item left" : `${length} Items left`;
};

const view = (targetElement, { todos }) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};

export default view;
