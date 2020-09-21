import {render, RenderPosition, remove} from "../utils/render.js";
import {sortTripPointsInTime, sortTripPointsByDays, sortTripPointsByDuration, sortTripPointsByPrice} from "../utils/trip.js";
import {updateItem} from "../utils/common.js";

import {SortType} from "../const.js";

import SortView from "../view/sort.js";
import NoTripPointsView from "../view/no-trip-points.js";
import TripDaysListView from "../view/trip-days-list.js";
import TripDayView from "../view/trip-day.js";
import TripPointsListView from "../view/trip-points-list.js";

import TripPointPresenter from "./trip-point.js";

export default class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._currentSortType = SortType.EVENT;
    this._tripPointPresenter = {};
    this._tripDaysComponents = [];

    this._sortComponent = new SortView();
    this._noTripPointsComponent = new NoTripPointsView();
    this._tripDaysListComponent = new TripDaysListView();

    this._handleTripPointChange = this._handleTripPointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._sourcedTripPoints = tripPoints.slice();

    this._renderTrip();
  }

  _handleTripPointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
    this._tripPointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _sortTripPoint(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripPoints.sort(sortTripPointsByDuration);
        break;
      case SortType.PRICE:
        this._tripPoints.sort(sortTripPointsByPrice);
        break;
      default:
        this._tripPoints = this._sourcedTripPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTripPoint(sortType);
    this._clearTripDaysList();

    if (this._currentSortType === SortType.EVENT) {
      this._renderTripDays();
      return;
    }

    this._renderSortedTripPoints();

  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoTripPoints() {
    render(this._tripEventsContainer, this._noTripPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderTripPoint(tripPointListElement, tripPoint) {
    const tripPointPresenter = new TripPointPresenter(tripPointListElement, this._handleTripPointChange);
    tripPointPresenter.init(tripPoint);
    this._tripPointPresenter[tripPoint.id] = tripPointPresenter;
  }

  _renderTripPoints(tripPointsContainer, tripPoints) {
    tripPoints
      .forEach((tripPoint) => {
        this._renderTripPoint(tripPointsContainer, tripPoint);
      });
  }

  _renderTripDay(tripDaysContainer, tripDay, dayNumner) {
    const tripDayComponent = new TripDayView(tripDay, dayNumner);
    const tripPointsListComponent = new TripPointsListView();

    render(tripDaysContainer, tripDayComponent, RenderPosition.BEFOREEND);
    render(tripDayComponent, tripPointsListComponent, RenderPosition.BEFOREEND);

    this._tripDaysComponents.push(tripDayComponent);

    if (tripDay) {
      this._renderTripPoints(tripPointsListComponent, sortTripPointsInTime(tripDay.tripPoints));
    }
  }

  _clearTripDaysList() {
    this._tripDaysComponents
      .forEach((tripDay) => {
        remove(tripDay);
      });

    this._tripDaysComponents = [];
  }

  _renderTripDays() {
    this._tripDays = sortTripPointsByDays(this._tripPoints);

    render(this._tripEventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    this._tripDays
      .forEach((tripDay, index) => {
        this._renderTripDay(this._tripDaysListComponent, tripDay, index);
      });
  }

  _renderSortedTripPoints() {
    render(this._tripEventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);
    this._renderTripDay(this._tripDaysListComponent);

    const tripPointsList = this._tripDaysListComponent.getElement().querySelector(`.trip-events__list`);

    this._renderTripPoints(tripPointsList, this._tripPoints);
  }

  _renderTrip() {
    if (this._tripPoints.length === 0) {
      this._renderNoTripPoints();
      return;
    }

    this._renderSort();
    this._renderTripDays();
  }
}
