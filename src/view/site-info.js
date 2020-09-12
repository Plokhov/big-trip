import {createElement, createShortDateTemplate} from "../utils.js";

export default class SiteInfo {
  constructor(itinerary) {
    this._itinerary = itinerary;
    this._element = null;
  }

  getTemplate() {
    const {totalCost = 0} = this._itinerary;

    if (Object.keys(this._itinerary).length !== 0) {
      const {
        cities,
        dateStart,
        dateFinish,
      } = this._itinerary;

      const infoTitleTemplate = cities.length > 3
        ? `${cities[0]}  &mdash; ...  &mdash; ${cities[cities.length - 1]}`
        : `${cities.join(`&nbsp;&mdash;&nbsp;`)}`;

      return (
        `<section class="trip-main__trip-info  trip-info">
          <div class="trip-info__main">
            <h1 class="trip-info__title">${infoTitleTemplate}</h1>
            <p class="trip-info__dates">
              ${createShortDateTemplate(dateStart)}
              &nbsp;&mdash;&nbsp;
              ${createShortDateTemplate(dateFinish)}
            </p>
          </div>

          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
          </p>
        </section>`
      );
    } else {
      return (
        `<section class="trip-main__trip-info  trip-info">
          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
          </p>
        </section>`
      );
    }
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
