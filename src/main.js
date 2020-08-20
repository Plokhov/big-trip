import {crateTripInfoTemplate} from "./view/site-info.js";
import {createTripMenuTemplate} from "./view/site-menu.js";
import {createTripFilterTemplate} from "./view/filter.js";
import {createTripSortTemplate} from "./view/sort.js";
import {createTripDaysListTemplate} from "./view/days-list.js";
import {createTripDayTemplate} from "./view/day.js";
import {createTripPointTemplate} from "./view/trip-point.js";
import {createNewTripPointTemplate} from "./view/new-trip-point.js";
import {createTripPointDetailsTemplate} from "./view/point-details.js";
import {createTripPointCostTemplate} from "./view/point-cost.js";
import {createTripPointInfoTemplate} from "./view/point-info.js";

const TRIP_POINT_COUNT = 13;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, crateTripInfoTemplate(), `afterbegin`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripMenuHeaderElement = tripControlsElement.querySelector(`h2:first-child`);
const tripFilterHeaderElement = tripControlsElement.querySelector(`h2:nth-child(2)`);

render(tripMenuHeaderElement, createTripMenuTemplate(), `afterend`);
render(tripFilterHeaderElement, createTripFilterTemplate(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createNewTripPointTemplate(), `beforeend`);
render(tripEventsElement, createTripDaysListTemplate(), `beforeend`);

// Отрисовка добавления новой точки путешествия
const tripEventEditElement = tripEventsElement.querySelector(`.event--edit`);
render(tripEventEditElement, createTripPointDetailsTemplate(), `beforeend`);

const tripEventDetailsElement = tripEventEditElement.querySelector(`.event__details`);
render(tripEventDetailsElement, createTripPointCostTemplate(), `beforeend`);
render(tripEventDetailsElement, createTripPointInfoTemplate(), `beforeend`);

// Отрисовка точек путешествия
const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);
render(tripDaysListElement, createTripDayTemplate(), `beforeend`);

const tripPointsListElement = tripDaysListElement.querySelector(`.trip-events__list`);

for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  render(tripPointsListElement, createTripPointTemplate(), `beforeend`);
}
