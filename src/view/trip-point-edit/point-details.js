import TripPointOffers from "./point-offers";
import TripPointDestination from "./point-destination.js";

export default class TripPointsDetails {
  constructor(offers, destination) {
    this._offers = offers;
    this._destination = destination;
  }

  getTemplate() {
    return (
      `<section class="event__details">
        ${new TripPointOffers(this._offers).getTemplate()}
        ${new TripPointDestination(this._destination).getTemplate()}
      </section>`
    );
  }
}
