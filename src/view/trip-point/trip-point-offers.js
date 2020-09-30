export default class TripPointOffers {
  constructor(offers) {
    this._offers = offers;
  }

  getTemplate() {
    return this._offers.map((offer) => {
      return `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`;
    }).join(``);
  }
}
