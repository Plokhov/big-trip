import Observer from "../utils/observer.js";

export default class TripPoints extends Observer {
  constructor() {
    super();
    this._tripPoints = [];
  }

  set(updateType, tripPoints) {
    this._tripPoints = tripPoints.slice();

    this._notify(updateType);
  }

  get() {
    return this._tripPoints;
  }

  update(updateType, update) {
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

  add(updateType, update) {
    this._tripPoints = [
      update,
      ...this._tripPoints
    ];

    this._notify(updateType, update);
  }

  delete(updateType, update) {
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

  static adaptToClient(tripPoint) {
    const adaptedTripPoint = Object.assign(
        {},
        tripPoint,
        {
          dateStart: tripPoint.date_from !== null ? new Date(tripPoint.date_from) : tripPoint.date_from,
          dateFinish: tripPoint.date_to !== null ? new Date(tripPoint.date_to) : tripPoint.date_to,
          city: tripPoint.city,
          price: tripPoint.base_price,
          isFavorite: tripPoint.is_favorite,
        }
    );

    delete adaptedTripPoint.date_from;
    delete adaptedTripPoint.date_to;
    delete adaptedTripPoint.is_favorite;
    delete adaptedTripPoint.base_price;

    return adaptedTripPoint;
  }

  static adaptToServer(tripPoint) {
    const adaptedTripPoint = Object.assign(
        {},
        tripPoint,
        {
          "date_from": tripPoint.dateStart instanceof Date ? tripPoint.dateStart.toISOString() : null,
          "date_to": tripPoint.dateFinish instanceof Date ? tripPoint.dateFinish.toISOString() : null,
          "city": tripPoint.destination.name,
          "base_price": tripPoint.price,
          "is_favorite": tripPoint.isFavorite
        }
    );

    delete adaptedTripPoint.dateStart;
    delete adaptedTripPoint.dateFinish;
    delete adaptedTripPoint.price;
    delete adaptedTripPoint.isFavorite;

    return adaptedTripPoint;
  }
}
