import {createTripPointOffersTemplate} from "./point-offers";
import {createTripPointDestinationTemplate} from "./point-destination.js";

export const createTripPointDetailsTemplate = (offers, destination) => {
  return (
    `<section class="event__details">
      ${createTripPointOffersTemplate(offers)}
      ${createTripPointDestinationTemplate(destination)}
    </section>`
  );
};
