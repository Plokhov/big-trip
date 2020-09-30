import Abstract from "./abstract.js";

export default class TripDay extends Abstract {
  constructor(tripDay, dayNumber) {
    super();
    this._tripDay = tripDay;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    const tripDayInfoTemplate = (!this._tripDay)
      ? ``
      : `<span class="day__counter">
        ${this._dayNumber + 1}
      </span>
      <time class="day__date" datetime="2019-03-18">
        ${this._tripDay.date}
      </time>`;

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          ${tripDayInfoTemplate}
        </div>
      </li>`
    );
  }
}
