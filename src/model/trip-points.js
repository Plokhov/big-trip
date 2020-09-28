import Observer from "../utils/observer.js";

export default class TripPoints extends Observer {
  constructor() {
    super();
    this._tripPoints = [];
  }

  setTripPoints(tripPoints) {
    this._tripPoints = tripPoints.slice();
  }

  getTripPoints() {
    return this._tripPoints;
  }

  updateTripPoint(updateType, update) {
    const index = this._tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip point`);
    }

    this._tripPoints = [
      ...this._tripPoints.slice(0, index),
      update,
      ...this._tripPoints.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addTripPoint(updateType, update) {
    this._tripPoints = [
      update,
      ...this._tripPoints
    ];

    this._notify(updateType, update);
  }

  deleteTripPoint(updateType, update) {
    const index = this._tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting trip point`);
    }

    this._tripPoints = [
      ...this._tripPoints.slice(0, index),
      ...this._tripPoints.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
