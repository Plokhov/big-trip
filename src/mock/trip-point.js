import {TRANSFER_TYPES, ACTIVITY_TYPES, DESTINATIONS, OPTIONS} from "../const.js";
import {getRandomInteger, getRandomArrayElement} from "../utils/common.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateTypeTripPoint = () => {
  const tripPointTypes = new Array(0).concat(TRANSFER_TYPES, ACTIVITY_TYPES);

  return getRandomArrayElement(tripPointTypes);
};

const generatePhotoTripPoint = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

export const generateTripPointDestinations = () => {
  const cities = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
  const infoCities = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const destinations = [];

  cities.forEach((city) => {
    return destinations.push({
      name: city,
      description: new Array(getRandomInteger(1, 5))
        .fill(``)
        .map(() => {
          return getRandomArrayElement(infoCities);
        })
        .join(` `),
      photos: new Array(getRandomInteger(1, 5))
        .fill(``)
        .map(generatePhotoTripPoint)
    });
  });

  return destinations;
};

export const generateTripPointOptions = () => {
  const optionName = [`Add luggage`, `Switch to comfort`, `Add meal`, `Choose seats`, `Travel by train`];

  const tripPointTypes = new Array(0).concat(TRANSFER_TYPES, ACTIVITY_TYPES);
  const tripPointOptions = [];

  tripPointTypes.forEach((type) => {
    return tripPointOptions.push({
      type,
      offers: new Array(getRandomInteger(0, 5))
        .fill(``)
        .map(() => {
          return {
            name: optionName[getRandomInteger(0, optionName.length - 1)],
            price: getRandomInteger(1, 10) * 10
          };
        })
    });
  });

  return tripPointOptions;
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

  return {
    id: generateId(),
    type,
    dateStart,
    dateFinish: generateDateFinishTripPoint(dateStart),
    price: getRandomInteger(1, 100) * 10,
    destination: getRandomArrayElement(DESTINATIONS),
    options: getRandomArrayElement(OPTIONS),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
