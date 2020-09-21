import TripPointView from "../view/trip-point/trip-point.js";
import TripPointEditView from "../view/trip-point-edit/trip-point-edit.js";

import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class TripPoint {
  constructor(tripPointListContainer, changeData) {
    this._tripPointListContainer = tripPointListContainer;
    this._changeData = changeData;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;

    this._handleRollupBtnClick = this._handleRollupBtnClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripPointEditComponent = new TripPointEditView(tripPoint);

    this._tripPointComponent.setRollupBtnClickHandler(this._handleRollupBtnClick);
    this._tripPointEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this._tripPointListContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._tripPointListContainer.getElement().contains(prevTripPointComponent.getElement())) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if (this._tripPointListContainer.getElement().contains(prevTripPointEditComponent.getElement())) {
      replace(this._tripPointEditComponent, prevTripPointEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._tripPointEditComponent);
  }

  _replacePointToForm() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleRollupBtnClick() {
    this._replacePointToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._tripPoint,
            {
              isFavorite: !this._tripPoint.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(tripPoint) {
    this._changeData(tripPoint);
    this._replaceFormToPoint();
  }
}
