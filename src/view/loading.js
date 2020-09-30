import Abstract from "./abstract.js";

export default class Loading extends Abstract {
  getTemplate() {
    return `<p class="trip-events__msg">
      Loading...
    </p>`;
  }
}
