import Abstract from "../abstract.js";

import TripPointOffers from "./point-offers.js";
import {TRANSFER_TYPES} from "../../const.js";
import {formatTime, createDurationtTimeTemplate} from "../../utils/trip.js";

export default class TripPointView extends Abstract {
  constructor(tripPoint) {
    super();
    this._tripPoint = tripPoint;

    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
  }

  getTemplate() {
    const {
      type,
      dateStart,
      dateFinish,
      destination,
      price,
      offers
    } = this._tripPoint;

    const tripPointTitle = TRANSFER_TYPES.includes(type, 0)
      ? `${type} to`
      : `${type} in`;

    const offersTemplate = offers
      ? new TripPointOffers(offers.slice(0, 3)).getTemplate()
      : ``;

    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${tripPointTitle} ${destination ? destination.name : ``}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">
                ${formatTime(dateStart)}
              </time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">
                ${formatTime(dateFinish)}
              </time>
            </p>
            <p class="event__duration">${createDurationtTimeTemplate(dateStart, dateFinish)}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersTemplate}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }

  _rollupBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupBtnClick();
  }

  setRollupBtnClickHandler(callback) {
    this._callback.rollupBtnClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupBtnClickHandler);
  }
}
