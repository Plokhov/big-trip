import {render, RenderPosition, replace} from "../utils/render.js";
import {sortTripPointsInTime, sortTripPointsByDays} from "../utils/trip.js";

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

    this._sortComponent = new SortView();
    this._noTripPointsComponent = new NoTripPointsView();
    this._tripDaysListComponent = new TripDaysListView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
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

  _renderTripPoints(tripPointsList, tripPoints) {
    tripPoints
      .forEach((tripPoint) => {
        this._renderTripPoint(tripPointsList, tripPoint);
      });
  }

  _renderTripDay(tripDaysList, tripDay, dayNumner) {
    const tripDayComponent = new TripDayView(tripDay, dayNumner);
    const tripPointsListComponent = new TripPointsListView();

    render(tripDaysList, tripDayComponent, RenderPosition.BEFOREEND);
    render(tripDayComponent, tripPointsListComponent, RenderPosition.BEFOREEND);

    this._renderTripPoints(tripPointsListComponent, sortTripPointsInTime(tripDay.tripPoints));
  }

  _renderTripDays() {
    const tripDays = sortTripPointsByDays(this._tripPoints);

    render(this._tripEventsContainer, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    tripDays
      .forEach((tripDay, index) => {
        this._renderTripDay(this._tripDaysListComponent, tripDay, index);
      });
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
