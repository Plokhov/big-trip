import TripPointOffers from "./trip-point-offers";
import TripPointDestination from "./trip-point-destination.js";

export default class TripPointsDetails {
  constructor(offersModel, type, offers, destination, isDisabled) {
    this._offersModel = offersModel;
    this._type = type;
    this._offers = offers;
    this._destination = destination;
    this._isDisabled = isDisabled;
  }

  getTemplate() {
    const currentTypeAllOffers = this._offersModel
      .get()
      .filter((it) => {
        return it.type === this._type;
      })[0];

    const destinationTemplate = this._destination
      ? new TripPointDestination(this._destination).getTemplate()
      : ``;

    const offersTemplate = currentTypeAllOffers
      ? new TripPointOffers(
          this._type,
          this._offers,
          this._offersModel,
          this._isDisabled)
        .getTemplate()
      : ``;

    return (
      `<section class="event__details">
        ${offersTemplate}

        ${destinationTemplate}
      </section>`
    );
  }
}
