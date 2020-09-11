export const TRANSFER_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`];
export const ACTIVITY_TYPES = [`Check-in`, `Sightseeing`, `Restaurant`];

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const humanizeTime = (dueDate) => {
  return dueDate.toLocaleTimeString(`en-US`, {hour12: false, hour: `numeric`, minute: `numeric`});
};

export const humanizeDate = (dueDate) => {
  return dueDate.toLocaleDateString(`en-GB`, {day: `numeric`, month: `numeric`, year: `2-digit`, hour: `numeric`, minute: `numeric`});
};

export const createShortDateTemplate = (date) => {
  return `${date
    .toLocaleDateString(`en-US`, {month: `short`, day: `numeric`})
    .toUpperCase()}`;
};

export const createDurationtTimeTemplate = (dateStart, dateFinish) => {
  const durationTime = dateFinish.getTime() - dateStart.getTime();

  const durationTimeInMinutes = durationTime / 60000;
  const durationTimeInHours = Math.floor(durationTimeInMinutes / 60);
  const durationTimeInDays = Math.floor(durationTimeInHours / 24);

  const minutes = durationTimeInMinutes % 60 < 10
    ? `0${durationTimeInMinutes % 60}`
    : `${durationTimeInMinutes % 60}`;

  const hours = durationTimeInHours % 24 < 10
    ? `0${durationTimeInHours % 24}`
    : `${durationTimeInHours % 24}`;

  const days = durationTimeInDays < 10
    ? `0${durationTimeInDays}`
    : `${durationTimeInDays}`;

  if (durationTimeInHours > 0 && durationTimeInHours < 24) {
    return `${hours}H ${durationTimeInMinutes % 60}M`;
  }

  if (durationTimeInDays > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  return `${durationTimeInMinutes}M`;
};

export const sortTripPointsInTime = (tripPoints) => {
  return tripPoints
    .slice()
    .sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
};

export const sortTripPointsByDays = (tripPoints) => {
  let tripDays = [];

  const tripDaysDates = Array
    .from(new Set(sortTripPointsInTime(tripPoints)
    .map((it) => {
      return createShortDateTemplate(it.dateStart);
    })));

  for (let i = 0; i < tripDaysDates.length; i++) {
    const tripDay = {
      date: tripDaysDates[i],
      tripPoints: tripPoints
        .filter((it) => {
          return createShortDateTemplate(it.dateStart) === tripDaysDates[i];
        })
    };

    tripDays.push(tripDay);
  }

  return tripDays;
};
