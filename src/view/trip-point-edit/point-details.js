import TripPointOffers from "./point-offers";
import TripPointDestination from "./point-destination.js";

import {OPTIONS} from '../../const.js';

export default class TripPointsDetails {
  constructor(type, options, destination) {
    this._type = type;
    this._options = options;
    this._destination = destination;
  }

  getTemplate() {
    const currentTypeOptions = OPTIONS.filter((it) => {
      return it.type === this._type;
    })[0];

    if (currentTypeOptions.offers.length === 0) {
      return (
        `<section class="event__details">
          ${new TripPointDestination(this._destination).getTemplate()}
        </section>`
      );
    }

    return (
      `<section class="event__details">
        ${new TripPointOffers(this._options).getTemplate()}
        ${new TripPointDestination(this._destination).getTemplate()}
      </section>`
    );
  }
}
