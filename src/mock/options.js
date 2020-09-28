import {TRANSFER_TYPES, ACTIVITY_TYPES} from "../const.js";
import {getRandomInteger} from "../utils/common.js";

export const generateOptions = () => {
  const optionNames = [
    `Add luggage`,
    `Switch to comfort`,
    `Add meal`,
    `Choose seats`,
    `Travel by train`,
    `Order Uber`,
    `Rent a car`,
    `Add breakfast`,
    `Book tickets`,
    `Lunch in city`,
  ];

  const tripPointTypes = new Array(0).concat(TRANSFER_TYPES, ACTIVITY_TYPES);
  const tripPointAllOptions = [];

  tripPointTypes.forEach((type) => {
    return tripPointAllOptions.push({
      type,
      offers: new Array(getRandomInteger(0, 7))
        .fill(``)
        .map(() => {
          return {
            title: optionNames[getRandomInteger(0, optionNames.length - 1)],
            price: getRandomInteger(1, 10) * 10
          };
        })
    });
  });

  return tripPointAllOptions;
};
