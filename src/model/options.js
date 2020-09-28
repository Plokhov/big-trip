import Observer from "../utils/observer.js";

export default class Options extends Observer {
  constructor() {
    super();
    this._options = [];
  }

  setOptions(options) {
    this._options = options.slice();
  }

  getOptions() {
    return this._options;
  }
}
