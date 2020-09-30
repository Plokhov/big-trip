export default class TripPointsOffers {
  constructor(type, offers, offersModel, isDisabled) {
    this._type = type;
    this._offers = offers;
    this._offersModel = offersModel;
    this._isDisabled = isDisabled;
  }

  getTemplate() {
    const currentTypeAllOffers = this._offersModel
      .get()
      .filter((it) => {
        return it.type === this._type;
      })[0].offers;

    const currentOffersTitles = this._offers.map((it) => it.title);

    if (currentTypeAllOffers.length === 0) {
      return ``;
    }

    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${currentTypeAllOffers.map((offer) => {
        return `<div class="event__offer-selector">
            <input
              class="event__offer-checkbox  visually-hidden"
              id="event-offer-${offer.title}-1"
              type="checkbox"
              name="${offer.title}"
              ${currentOffersTitles.includes(offer.title) ? `checked` : ``}
              ${this._isDisabled ? `disabled` : ``}
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
