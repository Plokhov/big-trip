export default class TripPointsOffers {
  constructor(options, optionsModel) {
    this._options = options;
    this._optionsModel = optionsModel;
  }

  getTemplate() {
    const {type, offers} = this._options;

    const currentOptions = this._optionsModel
      .getOptions()
      .filter((it) => {
        return it.type === type;
      })[0];

    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${currentOptions.offers.map((offer) => {
        return `<div class="event__offer-selector">
              <input
                class="event__offer-checkbox  visually-hidden"
                id="event-offer-${offer.title}-1"
                type="checkbox"
                name="${offer.title}"
                ${offers.includes(offer) ? `checked` : ``}
              >
              <label class="event__offer-label" for="event-offer-${offer.title}-1">
                <span class="event__offer-title">${offer.title}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
      }).join(``)}
        </div>
      </section>`
    );
  }
}
