export const TRANSFER_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`];
export const ACTIVITY_TYPES = [`Check-in`, `Sightseeing`, `Restaurant`];

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const UserAction = {
  UPDATE_TRIP_POINT: `UPDATE_TRIP_POINT`,
  ADD_TRIP_POINT: `ADD_TRIP_POINT`,
  DELETE_TRIP_POINT: `DELETE_TRIP_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};
