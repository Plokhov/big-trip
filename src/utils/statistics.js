import moment from "moment";

export const makeItemsUniq = (items) => [...new Set(items)];

export const countCostTripPoint = (tripPoints, type) => {
  const uniqTypePoints = tripPoints.filter((tripPoint) => tripPoint.type === type);
  const uniqTypePointsPrices = uniqTypePoints.map((point) => point.price);

  return uniqTypePointsPrices.reduce((sum, current) => sum + current);
};

export const countTripPointsByType = (tripPoints, type) => {
  return tripPoints.filter((tripPoint) => tripPoint.type === type).length;
};

export const countDurationtTime = (dateStart, dateFinish) => {
  const start = moment(dateStart);
  const finish = moment(dateFinish);

  return finish.diff(start, `minutes`);
};

export const countDurationTimeByType = (tripPoints, type) => {
  const uniqTypePoints = tripPoints.filter((tripPoint) => tripPoint.type === type);
  const uniqTypePointsDuration = uniqTypePoints.map((point) => countDurationtTime(point.dateStart, point.dateFinish));

  return uniqTypePointsDuration.reduce((sum, current) => sum + current);
};

export const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;

  if (mins < 60) {
    return minutes + `Min`;
  }

  return hours + `H :` + minutes + `Min`;
};
