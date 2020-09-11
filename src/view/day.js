import {sortTripPointsInTime} from "../utils.js";
import {createTripPointTemplate} from "./trip-point/trip-point.js";

export const createTripDayTemplate = (tripDays) => {

  return tripDays.map((tripDay, index) => {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="2019-03-18">${tripDay.date}</time>
      </div>

      <ul class="trip-events__list">
        ${sortTripPointsInTime(tripDay.tripPoints)
          .map((tripPoint) => createTripPointTemplate(tripPoint))
          .join(``)}
      </ul>
    </li>`;
  }).join(``);
};
