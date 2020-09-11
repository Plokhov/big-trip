import {createShortDateTemplate} from "../utils.js";

const createDateItineraryTemplate = (dateStart, dateFinish) => {
  const dateStartItineraryTemplate = createShortDateTemplate(dateStart);
  const dateFinishItineraryTemplate = createShortDateTemplate(dateFinish);

  return `${dateStartItineraryTemplate}&nbsp;&mdash;&nbsp;${dateFinishItineraryTemplate}`;
};

export const crateTripInfoTemplate = (itinerary) => {
  const {
    cities,
    dateStart,
    dateFinish,
    totalCost,
  } = itinerary;

  const infoTitleTemplate = cities.length > 3
    ? `${cities[0]}  &mdash; ...  &mdash; ${cities[cities.length - 1]}`
    : `${cities.join(`&nbsp;&mdash;&nbsp;`)}`;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${infoTitleTemplate}</h1>

        <p class="trip-info__dates">${createDateItineraryTemplate(dateStart, dateFinish)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`
  );
};
