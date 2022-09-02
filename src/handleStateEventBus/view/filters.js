import eventCreators from "../model/eventCreators.js";

const CLASS_NAME_SELETED = "selected";

const view = (targetElement, { currentFilter }, dispatch) => {
  const newFilters = targetElement.cloneNode(true);

  Array.from(newFilters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add(CLASS_NAME_SELETED);
    } else {
      a.classList.remove(CLASS_NAME_SELETED);
    }

    a.addEventListener("click", (e) => {
      e.preventDefault();
      dispatch(eventCreators.changeFilter(a.textContent));
    });
  });

  return newFilters;
};

export default view;
