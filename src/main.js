import TripPointsModel from "./model/trip-points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";

import TripEventsPresenter from "./presenter/trip-events.js";
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
const tripEventsPresenter = new TripEventsPresenter(
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
      tripEventsPresenter.clear();
      tripEventsPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      tripEventsPresenter.clear();
      buttonNewTripPoint.setAttribute(`disabled`, `disabled`);
      statisticsComponent = new StatisticsView(tripPointsModel.get());
      render(tripEventsElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

filterPresenter.init();
tripEventsPresenter.init();

buttonNewTripPoint.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripEventsPresenter.clearNoPoints();
  tripEventsPresenter.createPoint();
});

api.getOffers()
  .then((offers) => offersModel.set(offers))
  .then(() => api.getDestinations())
  .then((destinations) => destinationsModel.set(destinations))
  .then(() => api.getTripPoints())
  .then((tripPoints) => {
    tripPointsModel.set(UpdateType.INIT, tripPoints);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    render(tripMenuHeaderElement, siteMenuComponent, RenderPosition.AFTEREND);
  })
  .catch(() => {
    tripPointsModel.set(UpdateType.INIT, []);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    render(tripMenuHeaderElement, siteMenuComponent, RenderPosition.AFTEREND);
  });
