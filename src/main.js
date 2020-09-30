import TripPointsModel from "./model/trip-points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";

import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";

import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";

import {RenderPosition, render, remove} from "./utils/render.js";
import {MenuItem, UpdateType} from "./const.js";

import Api from "./api.js";

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripMenuHeaderElement = tripControlsElement.querySelector(`h2:first-child`);
const tripFilterHeaderElement = tripControlsElement.querySelector(`h2:nth-child(2)`);
const buttonNewTripPoint = document.querySelector(`.trip-main__event-add-btn`);
const tripEventsElement = document.querySelector(`.trip-events`);

const api = new Api(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const tripPointsModel = new TripPointsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(tripFilterHeaderElement, filterModel, tripPointsModel);
const tripPresenter = new TripPresenter(
    tripEventsElement,
    tripPointsModel,
    filterModel,
    offersModel,
    destinationsModel,
    api
);

const siteMenuComponent = new SiteMenuView();

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter._clearTrip();
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

filterPresenter.init();
tripPresenter.init();

buttonNewTripPoint.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createTripPoint();
});

api.getOffers()
  .then((offers) => offersModel.setOffers(offers))
  .then(() => api.getDestinations())
  .then((destinations) => destinationsModel.setDestinations(destinations))
  .then(() => api.getTripPoints())
  .then((tripPoints) => {
    tripPointsModel.setTripPoints(UpdateType.INIT, tripPoints);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    render(tripMenuHeaderElement, siteMenuComponent, RenderPosition.AFTEREND);
  })
  .catch(() => {
    tripPointsModel.setTripPoints(UpdateType.INIT, []);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    render(tripMenuHeaderElement, siteMenuComponent, RenderPosition.AFTEREND);
  });
