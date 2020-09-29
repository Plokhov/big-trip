import TripPointsModel from "./model/trip-points.js";
import FilterModel from "./model/filter.js";
import OptionsModel from "./model/options.js";
import DestinationsModel from "./model/destinations.js";

import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";

import SiteInfoView from "./view/site-info.js";
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";

import {generateItinerary} from "./mock/itinerary.js";
import {generateDestinations} from "./mock/destinations.js";
import {generateOptions} from "./mock/options.js";
import {generateTripPoint} from "./mock/trip-point.js";

import {RenderPosition, render, remove} from "./utils/render.js";
import {MenuItem} from "./const.js";

const TRIP_POINT_COUNT = 15;

const options = generateOptions();
const destinations = generateDestinations();
const tripPoints = new Array(TRIP_POINT_COUNT).fill(``).map(generateTripPoint);
const itinerary = generateItinerary(tripPoints);

const optionsModel = new OptionsModel();
optionsModel.setOptions(options);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinations);

const tripPointsModel = new TripPointsModel();
tripPointsModel.setTripPoints(tripPoints);

const filterModel = new FilterModel();

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, new SiteInfoView(itinerary), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripMenuHeaderElement = tripControlsElement.querySelector(`h2:first-child`);
const tripFilterHeaderElement = tripControlsElement.querySelector(`h2:nth-child(2)`);

const siteMenuComponent = new SiteMenuView();
render(tripMenuHeaderElement, siteMenuComponent, RenderPosition.AFTEREND);

let statisticsComponent = null;
const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      tripPresenter._clearTrip();
      statisticsComponent = new StatisticsView(tripPointsModel.getTripPoints());
      render(tripEventsElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const tripEventsElement = document.querySelector(`.trip-events`);

const filterPresenter = new FilterPresenter(tripFilterHeaderElement, filterModel, tripPointsModel);
const tripPresenter = new TripPresenter(
    tripEventsElement,
    tripPointsModel,
    filterModel,
    optionsModel,
    destinationsModel
);

filterPresenter.init();
tripPresenter.init();

const buttonNewTripPoint = document.querySelector(`.trip-main__event-add-btn`);
buttonNewTripPoint.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  tripPresenter.createTripPoint();
});
