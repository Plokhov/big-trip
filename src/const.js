import {generateTripPointDestinations, generateTripPointOptions} from "./mock/trip-point.js";

export const TRANSFER_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`];
export const ACTIVITY_TYPES = [`Check-in`, `Sightseeing`, `Restaurant`];

export const DESTINATIONS = generateTripPointDestinations();
export const OPTIONS = generateTripPointOptions();

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};
