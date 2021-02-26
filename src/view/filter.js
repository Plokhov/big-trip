import Abstract from "./abstract.js";

export default class Filter extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  getTemplate() {
    return (
      `<form class="trip-filters" action="#" method="get">

        ${this._filters.map((filter) => {
        return `<div class="trip-filters__filter">
            <input
              id="filter-${filter.type}"
              class="trip-filters__filter-input  visually-hidden"
              type="radio"
              name="trip-filter"
              value="${filter.type}"
              ${filter.type === this._currentFilter ? `checked` : ``}
            >
            <label
              class="trip-filters__filter-label"
              for="filter-${filter.type}"
            >
              ${filter.name}
            </label>
          </div>`;
      }).join(``)}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._typeChangeHandler);
  }
}
