import Abstract from "./abstract.js";

export default class NoTripPointsView extends Abstract {
  getTemplate() {
    return (
      `<p class="trip-events__msg">
        Click New Event to create your first point
      </p>`
    );
  }
}
