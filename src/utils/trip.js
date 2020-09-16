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

export const sortTripPointsByPrice = (tripPointA, tripPointB) => {
  return tripPointB.price - tripPointA.price;
};

export const sortTripPointsByDuration = (tripPointA, tripPointB) => {

  tripPointA.durationTime = tripPointA.dateFinish.getTime() - tripPointA.dateStart.getTime();
  tripPointB.durationTime = tripPointB.dateFinish.getTime() - tripPointB.dateStart.getTime();
  return tripPointB.durationTime - tripPointA.durationTime;
};
