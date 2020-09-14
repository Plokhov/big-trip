import Abstract from "./abstract.js";

export default class TripDayView extends Abstract {
  constructor(tripDay, dayNumber) {
    super();
    this._tripDay = tripDay;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">
            ${this._dayNumber + 1}
          </span>
          <time class="day__date" datetime="2019-03-18">
            ${this._tripDay.date}
          </time>
        </div>
      </li>`
    );
  }
}
