const CLASS_NAME_SELETED = "selected";

const view = (targetElement, { currentFilter }) => {
  const newFilters = targetElement.cloneNode(true);

  Array.from(newFilters.querySelectorAll("li a")).forEach((row) => {
    if (row.textContent === currentFilter) {
      row.classList.add(CLASS_NAME_SELETED);
    } else {
      row.classList.remove(CLASS_NAME_SELETED);
    }
  });

  return newFilters;
};

export default view;
