import {getRandomInteger, getRandomArrayElement} from "../utils/common.js";

const generatePhotoTripPoint = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

export const generateDestinations = () => {
  const cities = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Moscow`];
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
