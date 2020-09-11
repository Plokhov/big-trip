import {TRANSFER_TYPES, ACTIVITY_TYPES, getRandomInteger, getRandomArrayElement} from "../utils.js";


const generateTypeTripPoint = () => {
  const tripPointTypes = new Array(0).concat(TRANSFER_TYPES, ACTIVITY_TYPES);

  return getRandomArrayElement(tripPointTypes);
};

const generatePhotoTripPoint = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

const generateDestinationTripPoint = () => {
  const cities = [`Amsterdam`, `Milan`, `Madrid`, `Praga`, `New-York`, `Rio de Janeiro`];
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

  return {
    name: getRandomArrayElement(cities),
    description: new Array(getRandomInteger(0, 5))
      .fill(``)
      .map(() => {
        return getRandomArrayElement(infoCities);
      })
      .join(` `),
    photos: new Array(getRandomInteger(1, 5))
      .fill(``)
      .map(generatePhotoTripPoint)
  };
};

const generateOptionTripPoint = (type) => {
  const optionName = [`Add luggage`, `Switch to comfort`, `Add meal`, `Choose seats`, `Travel by train`];

  return {
    type,
    offers: new Array(getRandomInteger(0, 5))
      .fill(``)
      .map(() => {
        return {
          name: optionName[getRandomInteger(0, optionName.length - 1)],
          price: getRandomInteger(1, 10) * 10
        };
      })
  };
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
    type,
    dateStart,
    dateFinish: generateDateFinishTripPoint(dateStart),
    price: getRandomInteger(1, 100) * 10,
    destination: generateDestinationTripPoint(),
    options: generateOptionTripPoint(type),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
