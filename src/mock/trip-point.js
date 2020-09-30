import {TRANSFER_TYPES, ACTIVITY_TYPES} from "../const.js";
import {getRandomInteger, getRandomArrayElement} from "../utils/common.js";
import {generateOptions} from './options.js';
import {generateDestinations} from "./destinations.js";

const generateTypeTripPoint = () => {
  const tripPointTypes = new Array(0).concat(TRANSFER_TYPES, ACTIVITY_TYPES);

  return getRandomArrayElement(tripPointTypes);
};

const generateDateStartTripPoint = () => {
  const maxDaysGap = 2;
  const daysGap = getRandomInteger(0, maxDaysGap);
  const hoursGap = getRandomInteger(0, 23);
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate.setHours(currentDate.getHours() + hoursGap);

  currentDate.setMinutes(getRandomInteger(1, 11) * 5);

  return currentDate;
};

const generateDateFinishTripPoint = (dateStart) => {
  const dateFinish = new Date(dateStart);
  dateFinish.setMinutes(dateFinish.getMinutes() + getRandomInteger(1, 864) * 5);

  return dateFinish;
};

export const generateTripPoint = () => {
  const type = generateTypeTripPoint();
  const dateStart = generateDateStartTripPoint();
  const options = generateOptions();
  const destinations = generateDestinations();

  const tripPointOptions = options.filter((it) => {
    return it.type === type;
  })[0];

  const newTripPointsOption = Object.assign({}, tripPointOptions);
  newTripPointsOption.offers = newTripPointsOption.offers.slice(0, getRandomInteger(0, 3));

  return {
    id: (Date.now() + parseInt(Math.random() * 10000, 10)),
    type,
    dateStart,
    dateFinish: generateDateFinishTripPoint(dateStart),
    price: getRandomInteger(1, 100) * 10,
    destination: getRandomArrayElement(destinations),
    options: newTripPointsOption,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
