import TripPointPresenter, {State as TripPointPresenterViewState} from "./trip-point.js";
import TripPointNewPresenter from "./trip-point-new.js";

import SortView from "../view/sort.js";
import LoadingView from "../view/loading.js";
import NoTripPointsView from "../view/no-trip-points.js";
import TripDaysListView from "../view/trip-days-list.js";
import TripDayView from "../view/trip-day.js";
import TripPointsListView from "../view/trip-points-list.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {sortTripPointsInTime, sortTripPointsByDays, sortTripPointsByDuration, sortTripPointsByPrice} from "../utils/trip.js";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";

export default class TripEvents {
  constructor(
      tripEventsContainer,
      tripPointsModel,
      filterModel,
      offersModel,
      destinationsModel,
      api
  ) {
    this._tripEventsContainer = tripEventsContainer;
    this._tripPointsModel = tripPointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;

    this._currentSortType = SortType.EVENT;
    this._tripPointPresenter = {};
    this._tripDaysComponents = [];
    this._sortComponent = null;
    this._isLoading = true;

    this._loadingComponent = new LoadingView();
    this._noTripPointsComponent = new NoTripPointsView();
    this._tripDaysListComponent = new TripDaysListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._buttonNewTripPoint = document.querySelector(`.trip-main__event-add-btn`);
  }

  init() {
    this._tripPointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._render();
  }

  _getPoints() {
    const filterType = this._filterModel.get();
    const tripPoints = this._tripPointsModel.get();
    const filtredTripPoints = filter[filterType](tripPoints);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredTripPoints.sort(sortTripPointsByDuration);
      case SortType.PRICE:
        return filtredTripPoints.sort(sortTripPointsByPrice);
    }

    return filtredTripPoints;
  }

  _handleModeChange() {
    if (this._tripPointNewPresenter) {
      this._tripPointNewPresenter.destroy();
    }

    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP_POINT:
        this._tripPointPresenter[update.id].setViewState(TripPointPresenterViewState.SAVING);
        this._api.updateTripPoint(update)
          .then((response) => {
            this._tripPointsModel.update(updateType, response);
          })
          .catch(() => {
            this._tripPointPresenter[update.id].setViewState(TripPointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_TRIP_POINT:
        this._tripPointNewPresenter.setSaving();
        this._api.addTripPoint(update)
          .then((response) => {
            this._tripPointsModel.add(updateType, response);
          })
          .catch(() => {
            this._tripPointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_TRIP_POINT:
        this._tripPointPresenter[update.id].setViewState(TripPointPresenterViewState.DELETING);
        this._api.deleteTripPoint(update)
        .then(() => {
          this._tripPointsModel.delete(updateType, update);
        })
        .catch(() => {
          this._tripPointPresenter[update.id].setViewState(TripPointPresenterViewState.ABORTING);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._tripPointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this.clear();
        this._render();
        break;
      case UpdateType.MAJOR:
        this.clear({resetSortType: true});
        this._render();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._render();
        break;
    }
  }

  _render() {
    if (this._isLoading) {
      this._buttonNewTripPoint.setAttribute(`disabled`, `disabled`);
      this._renderLoading();
      return;
    }

    this._buttonNewTripPoint.removeAttribute(`disabled`, `disabled`);
    const tripPoints = this._getPoints();
    const tripPointsCount = tripPoints.length;

    if (tripPointsCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    if (this._currentSortType !== SortType.EVENT) {
      render(this._tripEventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);
      this._renderDay(this._tripDaysListComponent);

      const tripPointsList = this._tripDaysListComponent.getElement().querySelector(`.trip-events__list`);
      this._renderPoints(tripPointsList, this._getPoints());
      return;
    }

    this._renderDaysList();
  }

  clear({resetSortType = false} = {}) {
    this._tripDaysComponents
    .forEach((tripDay) => {
      remove(tripDay);
    });

    this._tripDaysComponents = [];

    remove(this._loadingComponent);
    remove(this._noTripPointsComponent);
    remove(this._sortComponent);

    if (this._tripPointNewPresenter) {
      this._tripPointNewPresenter.destroy();
    }

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderLoading() {
    render(this._tripEventsContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoints() {
    render(this._tripEventsContainer, this._noTripPointsComponent, RenderPosition.BEFOREEND);
  }

  clearNoPoints() {
    this.clear();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this.clear();
    this._currentSortType = sortType;

    if (this._currentSortType === SortType.EVENT) {
      this._render();
      return;
    }

    this._render();
  }

  _renderDaysList() {
    this._tripDays = sortTripPointsByDays(this._getPoints());

    render(this._tripEventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    this._tripDays
      .forEach((tripDay, index) => {
        this._renderDay(this._tripDaysListComponent, tripDay, index);
      });
  }

  _renderDay(tripDaysContainer, tripDay, dayNumner) {
    const tripDayComponent = new TripDayView(tripDay, dayNumner);
    const tripPointsListComponent = new TripPointsListView();

    render(tripDaysContainer, tripDayComponent, RenderPosition.BEFOREEND);
    render(tripDayComponent, tripPointsListComponent, RenderPosition.BEFOREEND);

    this._tripDaysComponents.push(tripDayComponent);

    if (tripDay) {
      this._renderPoints(tripPointsListComponent, sortTripPointsInTime(tripDay.tripPoints));
    }
  }

  _renderPoints(tripPointsContainer, tripPoints) {
    tripPoints
      .forEach((tripPoint) => {
        this._renderPoint(tripPointsContainer, tripPoint);
      });
  }

  _renderPoint(tripPointListElement, tripPoint) {
    const tripPointPresenter = new TripPointPresenter(
        tripPointListElement,
        this._currentSortType,
        this._handleViewAction,
        this._handleModeChange,
        this._offersModel,
        this._destinationsModel
    );
    tripPointPresenter.init(tripPoint);
    this._tripPointPresenter[tripPoint.id] = tripPointPresenter;
  }

  createPoint() {
    this._currentSortType = SortType.EVENT;
    this._filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._tripPointNewPresenter = new TripPointNewPresenter(
        this._tripDaysListComponent,
        this._handleViewAction,
        this._offersModel,
        this._destinationsModel
    );

    const tripPoints = this._getPoints();
    const tripPointsCount = tripPoints.length;

    if (tripPointsCount === 0) {
      this.clear();

      this._tripPointNewPresenter = new TripPointNewPresenter(
          this._tripEventsContainer,
          this._handleViewAction,
          this._offersModel,
          this._destinationsModel
      );
    }

    this._tripPointNewPresenter.init();
  }
}
