import {render, RenderPosition, replace} from "../utils/render.js";
import {sortTripPointsInTime, sortTripPointsByDays, sortTripPointsByDuration, sortTripPointsByPrice} from "../utils/trip.js";
import {SortType} from "../const.js";

import SortView from "../view/sort.js";
import NoTripPointsView from "../view/no-trip-points.js";
import TripDaysListView from "../view/trip-days-list.js";
import TripDayView from "../view/trip-day.js";
import TripPointsListView from "../view/trip-points-list.js";
import TripPointView from "../view/trip-point/trip-point.js";
import TripPointEditView from "../view/trip-point-edit/trip-point-edit.js";

export default class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._currentSortType = SortType.EVENT;

    this._sortComponent = new SortView();
    this._noTripPointsComponent = new NoTripPointsView();
    this._tripDaysListComponent = new TripDaysListView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._sourcedTripPoints = tripPoints.slice();

    this._renderTrip();
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
    const tripPointComponent = new TripPointView(tripPoint);
    const tripPointEditComponent = new TripPointEditView(tripPoint);

    const replacePointToForm = () => {
      replace(tripPointEditComponent, tripPointComponent);
    };

    const replaceFormToPoint = () => {
      replace(tripPointComponent, tripPointEditComponent);
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

    tripPointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    });

    render(tripPointListElement, tripPointComponent, RenderPosition.BEFOREEND);
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

    if (tripDay) {
      this._renderTripPoints(tripPointsListComponent, sortTripPointsInTime(tripDay.tripPoints));
    }
  }

  _clearTripDaysList() {
    this._tripDaysListComponent.getElement().innerHTML = ``;
  }

  _renderTripDays() {
    const tripDays = sortTripPointsByDays(this._tripPoints);

    render(this._tripEventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    tripDays
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
