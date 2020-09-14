import {sortTripPointsInTime} from "../utils/trip.js";

const createTotalCostItinerary = (tripPoints) => {
  return tripPoints
    .map((tripPoint) => {
      return tripPoint.price;
    })
    .reduce((sum, current) => {
      return sum + current;
    }, 0);
};

export const generateItinerary = (tripPoints) => {
  const tripPointsSortInTime = sortTripPointsInTime(tripPoints);
  let itinerary = {};

  if (tripPoints.length > 0) {
    itinerary = {
      cities: Array.from(new Set(tripPointsSortInTime
        .map((tripPoint) => {
          return tripPoint.destination.name;
        }))),
      dateStart: tripPointsSortInTime[0].dateStart,
      dateFinish: tripPointsSortInTime[tripPointsSortInTime.length - 1].dateStart,
      totalCost: createTotalCostItinerary(tripPoints),
    };
  }

  return itinerary;
};
