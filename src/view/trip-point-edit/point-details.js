import TripPointOffers from "./point-offers";
import TripPointDestination from "./point-destination.js";

export default class TripPointsDetails {
  constructor(optionsModel, type, options, destination) {
    this._optionsModel = optionsModel;
    this._type = type;
    this._options = options;
    this._destination = destination;
  }

  getTemplate() {
    const currentTypeOptions = this._optionsModel
      .getOptions()
      .filter((it) => {
        return it.type === this._type;
      })[0];

    const destinationTemplate = this._destination
      ? new TripPointDestination(this._destination).getTemplate()
      : ``;

    if (currentTypeOptions.offers.length === 0) {
      return (
        `<section class="event__details">
          ${new TripPointDestination(this._destination).getTemplate()}
        </section>`
      );
    }

    return (
      `<section class="event__details">
        ${new TripPointOffers(this._options, this._optionsModel).getTemplate()}

        ${destinationTemplate}
      </section>`
    );
  }
}
