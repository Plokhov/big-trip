import Abstract from "./abstract.js";
import {createShortDateTemplate} from "../utils/trip.js";

export default class SiteInfoView extends Abstract {
  constructor(itinerary) {
    super();
    this._itinerary = itinerary;
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
}
