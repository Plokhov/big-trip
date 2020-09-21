import {sortTripPointsInTime} from "../utils/trip.js";

const createCityItinerary = (tripPoints) => {
  const tripPointsSortInTime = sortTripPointsInTime(tripPoints);

  const cityes = Array.from(new Set(tripPointsSortInTime.map((tripPoint) => {
    if (tripPoint.destination) {
      return tripPoint.destination.name;
    }

    return ``;
  })));

  return cityes;
};

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
      cities: createCityItinerary(tripPoints),
      dateStart: tripPointsSortInTime[0].dateStart,
      dateFinish: tripPointsSortInTime[tripPointsSortInTime.length - 1].dateStart,
      totalCost: createTotalCostItinerary(tripPoints),
    };
  }

  return itinerary;
};
