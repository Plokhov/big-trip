import SiteInfo from "./view/site-info.js";
import SiteMenu from "./view/site-menu.js";
import Filter from "./view/filter.js";
import Sort from "./view/sort.js";
import TripDaysList from "./view/trip-days-list.js";

import {generateItinerary} from "./mock/itinerary.js";
import {generateTripPoint} from "./mock/trip-point.js";
import {sortTripPointsInTime, sortTripPointsByDays, render, RenderPosition} from "./utils.js";

import TripPoint from "./view/trip-point/trip-point.js";
import NewTripPoint from "./view/new-trip-point/new-trip-point.js";
import TripDay from "./view/trip-day.js";
import TripPointsList from "./view/trip-points-list.js";

const TRIP_POINT_COUNT = 14;

const tripPoints = new Array(TRIP_POINT_COUNT).fill(``).map(generateTripPoint);
const itinerary = generateItinerary(tripPoints);

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, new SiteInfo(itinerary).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripMenuHeaderElement = tripControlsElement.querySelector(`h2:first-child`);
const tripFilterHeaderElement = tripControlsElement.querySelector(`h2:nth-child(2)`);

render(tripMenuHeaderElement, new SiteMenu().getElement(), RenderPosition.AFTEREND);
render(tripFilterHeaderElement, new Filter().getElement(), RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new Sort().getElement(), RenderPosition.BEFOREEND);

const renderTripPoint = (tripPointListElement, tripPoint) => {
  const tripPointComponent = new TripPoint(tripPoint);
  const newTripPointComponent = new NewTripPoint(tripPoint);

  const replacePointToForm = () => {
    tripPointListElement
      .replaceChild(newTripPointComponent.getElement(), tripPointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    tripPointListElement
      .replaceChild(tripPointComponent.getElement(), newTripPointComponent.getElement());
  };

  tripPointComponent
    .getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      replacePointToForm();
    });

  newTripPointComponent
    .getElement()
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

  render(tripPointListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripDays = (tripDaysContainer, points) => {
  const tripDaysListComponent = new TripDaysList();

  const tripDays = sortTripPointsByDays(points.slice());

  render(tripDaysContainer, tripDaysListComponent.getElement(), RenderPosition.BEFOREEND);

  tripDays.forEach((tripDay, index) => {
    const tripDayComponent = new TripDay(tripDay, index);
    const tripPointsListComponent = new TripPointsList();

    render(tripDaysListComponent.getElement(), tripDayComponent.getElement(), RenderPosition.BEFOREEND);
    render(tripDayComponent.getElement(), tripPointsListComponent.getElement(), RenderPosition.BEFOREEND);

    sortTripPointsInTime(tripDay.tripPoints)
      .forEach((tripPoint) => {
        renderTripPoint(tripPointsListComponent.getElement(), tripPoint);
      });
  });
};

renderTripDays(tripEventsElement, tripPoints);
