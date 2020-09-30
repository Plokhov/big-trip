import moment from "moment";

export const formatTime = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`HH:mm`);
};

export const formatFullDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`DD MM YY hh:mm`);
};

const formatShortDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`MMM D`);
};

export const createDurationtTimeTemplate = (dateStart, dateFinish) => {
  const start = moment(dateStart);
  const finish = moment(dateFinish);

  const durationTimeInMinutes = finish.diff(start, `minutes`);
  const durationTimeInHours = finish.diff(start, `hours`);
  const durationTimeInDays = finish.diff(start, `days`);

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
  const tripDays = [];

  const tripDaysDates = Array
    .from(new Set(sortTripPointsInTime(tripPoints)
    .map((it) => {
      return formatShortDate(it.dateStart);
    })));

  for (let i = 0; i < tripDaysDates.length; i++) {
    const tripDay = {
      date: tripDaysDates[i],
      tripPoints: tripPoints
        .filter((it) => {
          return formatShortDate(it.dateStart) === tripDaysDates[i];
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

export const isTripPointExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  return moment(dueDate).isBefore(currentDate);
};

export const isTripPointPlanned = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  return moment(dueDate).isAfter(currentDate);
};
