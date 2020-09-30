import TripPointOffers from "./point-offers";
import TripPointDestination from "./point-destination.js";

export default class TripPointsDetails {
  constructor(offersModel, type, offers, destination) {
    this._offersModel = offersModel;
    this._type = type;
    this._offers = offers;
    this._destination = destination;
  }

  getTemplate() {
    const currentTypeAllOffers = this._offersModel
      .getOffers()
      .filter((it) => {
        return it.type === this._type;
      })[0];

    const destinationTemplate = this._destination
      ? new TripPointDestination(this._destination).getTemplate()
      : ``;

    const offersTemplate = currentTypeAllOffers
      ? new TripPointOffers(this._type, this._offers, this._offersModel).getTemplate()
      : ``;


    return (
      `<section class="event__details">
        ${offersTemplate}

        ${destinationTemplate}
      </section>`
    );
  }
}
