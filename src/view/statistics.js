import Abstract from "./abstract.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {makeItemsUniq, countCostTripPoint, countTripPointsByType, countDurationTimeByType, getTimeFromMins} from "../utils/statistics.js";
import {TRANSFER_TYPES} from "../const.js";

const renderMoneyChart = (moneyCtx, tripPoints) => {
  const tripPoinstTypes = tripPoints.map((tripPoint) => tripPoint.type);
  const uniqTypes = makeItemsUniq(tripPoinstTypes);
  const tripPointsTypePrices = uniqTypes.map((type) => countCostTripPoint(tripPoints, type));

  const BAR_HEIGHT = 55;
  moneyCtx.height = BAR_HEIGHT * uniqTypes.length;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: tripPointsTypePrices,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, tripPoints) => {
  const tripPoinstTypes = tripPoints.map((tripPoint) => tripPoint.type);
  const tripPointsTransferTypes = tripPoinstTypes.filter((type) => {
    return TRANSFER_TYPES.includes(type, 0);
  });

  const uniqTypes = makeItemsUniq(tripPointsTransferTypes);
  const tripPointsByTypeCounts = uniqTypes.map((type) => countTripPointsByType(tripPoints, type));

  const BAR_HEIGHT = 55;
  transportCtx.height = BAR_HEIGHT * uniqTypes.length;

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: tripPointsByTypeCounts,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, tripPoints) => {
  const tripPoinstTypes = tripPoints.map((tripPoint) => tripPoint.type);
  const uniqTypes = makeItemsUniq(tripPoinstTypes);
  const tripPointsTypeDurations = uniqTypes.map((type) => countDurationTimeByType(tripPoints, type));

  const BAR_HEIGHT = 55;
  timeSpendCtx.height = BAR_HEIGHT * uniqTypes.length;

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: tripPointsTypeDurations,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => {
            return getTimeFromMins(val);
          }
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

export default class Statistics extends Abstract {
  constructor(tripPoints) {
    super();
    this._tripPoints = tripPoints;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  getTemplate() {
    return `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`;
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderMoneyChart(moneyCtx, this._tripPoints);
    this._transportChart = renderTransportChart(transportCtx, this._tripPoints);
    this._timeSpentChart = renderTimeSpendChart(timeSpendCtx, this._tripPoints);
  }
}
