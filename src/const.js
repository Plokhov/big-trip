export const TRANSFER_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`];
export const ACTIVITY_TYPES = [`check-in`, `sightseeing`, `restaurant`];

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
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`
};
