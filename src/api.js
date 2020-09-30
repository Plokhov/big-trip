import TripPointsModel from "./model/trip-points.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTripPoints() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((tripPoints) => tripPoints.map(TripPointsModel.adaptToClient));
  }

  getOffers() {
    return this._load({url: `offers`})
    .then(Api.toJSON);
  }

  getDestinations() {
    return this._load({url: `destinations`})
    .then(Api.toJSON);
  }

  updateTripPoint(tripPoint) {
    return this._load({
      url: `points/${tripPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(TripPointsModel.adaptToServer(tripPoint)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(TripPointsModel.adaptToClient);
  }

  addTripPoint(tripPoint) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(TripPointsModel.adaptToServer(tripPoint)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(TripPointsModel.adaptToClient);
  }

  deleteTripPoint(tripPoint) {
    return this._load({
      url: `points/${tripPoint.id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
