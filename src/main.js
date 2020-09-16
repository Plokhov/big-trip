import SiteInfoView from "./view/site-info.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import Trip from "./presenter/trip.js";

import {generateItinerary} from "./mock/itinerary.js";
import {generateTripPoint} from "./mock/trip-point.js";

import {RenderPosition, render} from "./utils/render.js";

const TRIP_POINT_COUNT = 10;

const tripPoints = new Array(TRIP_POINT_COUNT).fill(``).map(generateTripPoint);
const itinerary = generateItinerary(tripPoints);

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, new SiteInfoView(itinerary), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripMenuHeaderElement = tripControlsElement.querySelector(`h2:first-child`);
const tripFilterHeaderElement = tripControlsElement.querySelector(`h2:nth-child(2)`);

render(tripMenuHeaderElement, new SiteMenuView(), RenderPosition.AFTEREND);
render(tripFilterHeaderElement, new FilterView(), RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
const tripPresenter = new Trip(tripEventsElement);

tripPresenter.init(tripPoints);
