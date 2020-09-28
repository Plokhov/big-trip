import {FilterType} from "../const";
import {isTripPointExpired, isTripPointPlanned} from "../utils/trip.js";

export const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isTripPointPlanned(tripPoint.dateStart)),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isTripPointExpired(tripPoint.dateFinish)),
};
