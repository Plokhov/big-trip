import TripPointEditView from "../view/trip-point-edit/trip-point-edit.js";
import {generateId} from "../mock/trip-point.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class TripPointNew {
  constructor(tripPointListContainer, changeData, optionsModel, destinationsModel) {
    this._tripPointListContainer = tripPointListContainer;
    this._changeData = changeData;
    this._optionsModel = optionsModel;
    this._destinationsModel = destinationsModel;

    this._isNewTripPoint = true;

    this._tripPointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._buttonNewTripPoint = document.querySelector(`.trip-main__event-add-btn`);
  }

  init() {
    if (this._tripPointEditComponent !== null) {
      return;
    }

    this._buttonNewTripPoint.setAttribute(`disabled`, `disabled`);

    this._tripPointEditComponent = new TripPointEditView(
        undefined,
        this._optionsModel,
        this._destinationsModel,
        false
    );
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripPointEditComponent.setDeleteClickHandler(this._handleCancelClick);

    render(this._tripPointListContainer, this._tripPointEditComponent, RenderPosition.BEFOREBEGIN);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripPointEditComponent === null) {
      return;
    }

    this._buttonNewTripPoint.removeAttribute(`disabled`);
    remove(this._tripPointEditComponent);
    this._tripPointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(tripPoint) {
    this._changeData(
        UserAction.ADD_TRIP_POINT,
        UpdateType.MAJOR,
        Object.assign({id: generateId()}, tripPoint)
    );
    this.destroy();
  }

  _handleCancelClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
