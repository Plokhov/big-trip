import TripPointView from "../view/trip-point/trip-point.js";
import TripPointEditView from "../view/trip-point-edit/trip-point-edit.js";

import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {SortType, UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class TripPoint {
  constructor(
      tripPointListContainer,
      currentSortType,
      changeData,
      changeMode,
      offersModel,
      destinationsModel
  ) {
    this._tripPointListContainer = tripPointListContainer;
    this._currentSortType = currentSortType;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleRollupBtnClick = this._handleRollupBtnClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripPointEditComponent = new TripPointEditView(
        tripPoint,
        this._offersModel,
        this._destinationsModel
    );

    this._tripPointComponent.setRollupBtnClickHandler(this._handleRollupBtnClick);
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripPointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this._tripPointListContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripPointEditComponent, prevTripPointEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._tripPointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripPointEditComponent.reset(this._tripPoint);
      this._replaceFormToPoint();

      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleRollupBtnClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit(tripPoint) {
    const isMinorUpdate = this._currentSortType === SortType.TIME || this._currentSortType === SortType.PRICE;

    this._changeData(
        UserAction.UPDATE_TRIP_POINT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.MAJOR,
        tripPoint
    );
    this._replaceFormToPoint();
  }

  _handleDeleteClick(task) {
    const isMinorUpdate = this._currentSortType === SortType.TIME || this._currentSortType === SortType.PRICE;

    this._changeData(
        UserAction.DELETE_TRIP_POINT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.MAJOR,
        task
    );
  }
}
