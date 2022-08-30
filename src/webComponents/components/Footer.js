const CLASS_NAME_SELETED = "selected";

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;

  return length === 1 ? "1 Item left" : `${length} Items left`;
};

class Footer extends HTMLElement {
  static get observedAttributes() {
    return ["filter", "todos"];
  }

  get todos() {
    if (!this.hasAttribute("todos")) {
      return [];
    }

    return JSON.parse(this.getAttribute("todos"));
  }

  set todos(value) {
    this.setAttribute("todos", JSON.stringify(value));
  }

  get filter() {
    return this.getAttribute("filter");
  }

  set filter(value) {
    this.setAttribute("filter", value);
  }

  updateCount() {
    const { todos } = this;
    const label = getTodoCount(this.todos);
    this.querySelector("span.todo-count").textContent = label;
  }

  connectedCallback() {
    const template = document.getElementById("footer");
    const content = template.content.firstElementChild.cloneNode(true);

    this.appendChild(content);

    const { filter } = this;

    this.querySelectorAll("li a").forEach((row) => {
      if (row.textContent === filter) {
        row.classList.add(CLASS_NAME_SELETED);
      } else {
        row.classList.remove(CLASS_NAME_SELETED);
      }
    });

    this.updateCount();
  }

  attributeChangedCallback() {
    this.updateCount();
  }
}

export default Footer;
