import SiteInfoView from "./view/site-info.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import NoTripPointsView from "./view/no-points.js";
import SortView from "./view/sort.js";
import TripDaysListView from "./view/trip-days-list.js";

import {generateItinerary} from "./mock/itinerary.js";
import {generateTripPoint} from "./mock/trip-point.js";

import {sortTripPointsInTime, sortTripPointsByDays} from "./utils/trip.js";
import {RenderPosition, render, replace} from "./utils/render.js";

import TripPointView from "./view/trip-point/trip-point.js";
import NewTripPointView from "./view/new-trip-point/new-trip-point.js";
import TripDayView from "./view/trip-day.js";
import TripPointsListView from "./view/trip-points-list.js";

const TRIP_POINT_COUNT = 15;

const tripPoints = new Array(TRIP_POINT_COUNT).fill(``).map(generateTripPoint);
const itinerary = generateItinerary(tripPoints);

const renderTripPoint = (tripPointListElement, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const newTripPointComponent = new NewTripPointView(tripPoint);

  const replacePointToForm = () => {
    replace(newTripPointComponent, tripPointComponent);
  };

  const replaceFormToPoint = () => {
    replace(tripPointComponent, newTripPointComponent);
  };

  const escKeyDownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  tripPointComponent.setRollupBtnClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, escKeyDownHandler);
  });

  newTripPointComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, escKeyDownHandler);
  });

  render(tripPointListElement, tripPointComponent, RenderPosition.BEFOREEND);
};

const renderTripDays = (tripDaysContainer, points) => {
  const tripDaysListComponent = new TripDaysListView();

  const tripDays = sortTripPointsByDays(points.slice());

  render(tripDaysContainer, tripDaysListComponent, RenderPosition.BEFOREEND);

  tripDays.forEach((tripDay, index) => {
    const tripDayComponent = new TripDayView(tripDay, index);
    const tripPointsListComponent = new TripPointsListView();

    render(tripDaysListComponent, tripDayComponent, RenderPosition.BEFOREEND);
    render(tripDayComponent, tripPointsListComponent, RenderPosition.BEFOREEND);

    sortTripPointsInTime(tripDay.tripPoints)
      .forEach((tripPoint) => {
        renderTripPoint(tripPointsListComponent.getElement(), tripPoint);
      });
  });
};

const renderEvents = (enetsContainer, events) => {
  if (events.length === 0) {
    render(enetsContainer, new NoTripPointsView(), RenderPosition.BEFOREEND);
  } else {
    render(enetsContainer, new SortView(), RenderPosition.BEFOREEND);
    renderTripDays(enetsContainer, events);
  }
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, new SiteInfoView(itinerary), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripMenuHeaderElement = tripControlsElement.querySelector(`h2:first-child`);
const tripFilterHeaderElement = tripControlsElement.querySelector(`h2:nth-child(2)`);

render(tripMenuHeaderElement, new SiteMenuView(), RenderPosition.AFTEREND);
render(tripFilterHeaderElement, new FilterView(), RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
renderEvents(tripEventsElement, tripPoints);
