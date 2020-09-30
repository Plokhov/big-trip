export default class TripPointTypeList {
  constructor(types, tripPointType) {
    this._types = types;
    this._tripPointType = tripPointType;
  }

  getTemplate() {
    return this._types.map((type) => {
      return `<div class="event__type-item">
        <input
          id="event-type-${type.toLowerCase()}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${type}"
          ${this._tripPointType === type ? `checked` : ``}
        >
        <label
          class="event__type-label  event__type-label--${type.toLowerCase()}"
          for="event-type-${type.toLowerCase()}-1"
        >
          ${type}
        </label>
      </div>`;
    }).join(``);
  }
}
