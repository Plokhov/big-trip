export const createTripPointOffersTemplate = (offers) => {
  return offers.map((offer) => {
    return `<li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;
      &euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`;
  }).join(``);
};
