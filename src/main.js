import {crateTripInfoTemplate} from "./view/site-info.js";
import {createTripMenuTemplate} from "./view/site-menu.js";
import {createTripFilterTemplate} from "./view/filter.js";
import {createTripSortTemplate} from "./view/sort.js";
import {createTripDaysListTemplate} from "./view/days-list.js";
import {createTripDayTemplate} from "./view/day.js";
import {createNewTripPointTemplate} from "./view/new-trip-point/new-trip-point.js";

import {generateItinerary} from "./mock/itinerary.js";

import {generateTripPoint} from "./mock/trip-point.js";

import {sortTripPointsByDays, render} from "./utils.js";

const TRIP_POINT_COUNT = 16;

const tripPoints = new Array(TRIP_POINT_COUNT).fill(``).map(generateTripPoint);
const itinerary = generateItinerary(tripPoints);
const tripDays = sortTripPointsByDays(tripPoints.slice(1));

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, crateTripInfoTemplate(itinerary), `afterbegin`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripMenuHeaderElement = tripControlsElement.querySelector(`h2:first-child`);
const tripFilterHeaderElement = tripControlsElement.querySelector(`h2:nth-child(2)`);

render(tripMenuHeaderElement, createTripMenuTemplate(), `afterend`);
render(tripFilterHeaderElement, createTripFilterTemplate(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createNewTripPointTemplate(tripPoints[0]), `beforeend`);
render(tripEventsElement, createTripDaysListTemplate(), `beforeend`);

// Отрисовка точек путешествия
const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);
render(tripDaysListElement, createTripDayTemplate(tripDays), `beforeend`);
