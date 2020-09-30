import FilterView from "../view/filter.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {FilterType, UpdateType} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, tripPointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tripPointsModel = tripPointsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);

    this._tripPointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.get();

    const filters = this._getAllFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setTypeChangeHandler(this._handleTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.set(UpdateType.MAJOR, filterType);
  }

  _getAllFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: `EVERYTHING`,
      },
      {
        type: FilterType.FUTURE,
        name: `FUTURE`,
      },
      {
        type: FilterType.PAST,
        name: `PAST`,
      },
    ];
  }
}
