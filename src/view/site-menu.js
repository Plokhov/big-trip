import Abstract from "./abstract.js";
import {MenuItem} from "../const.js";

export default class SiteMenuView extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-type="${MenuItem.TABLE}">Table</a>
        <a class="trip-tabs__btn" href="#" data-menu-type="${MenuItem.STATISTICS}">Stats</a>
      </nav>`
    );
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuType);

    const tableButton = this.getElement().querySelector(`[data-menu-type="${MenuItem.TABLE}"]`);
    const statsButton = this.getElement().querySelector(`[data-menu-type="${MenuItem.STATISTICS}"]`);

    if (evt.target.dataset.menuType === MenuItem.STATISTICS) {
      statsButton.classList.add(`trip-tabs__btn--active`);
      tableButton.classList.remove(`trip-tabs__btn--active`);
    }

    if (evt.target.dataset.menuType === MenuItem.TABLE) {
      tableButton.classList.add(`trip-tabs__btn--active`);
      statsButton.classList.remove(`trip-tabs__btn--active`);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
