import {TRANSFER_TYPES, ACTIVITY_TYPES, humanizeDate} from "../../utils.js";
import {createTripPointTypeListTemplate} from "./point-type-list.js";
import {createTripPointEditButtonsTemplate} from "./point-edit-buttons.js";
import {createTripPointDetailsTemplate} from "./point-details.js";

export const createNewTripPointTemplate = (tripPoint = {}) => {
  const {
    type = `Bus`,
    dateStart = new Date(`2019-03-18T00:00:00`),
    dateFinish = new Date(`2019-03-18T00:00:00`),
    price = 0,
    destination = {
      name: ``,
      description: `Geneva is a city in Switzerland that lies at the southern
        tip of expansive Lac Léman (Lake Geneva).
        Surrounded by the Alps and Jura mountains,
        the city has views of dramatic Mont Blanc.`,
      photos: [
        `img/photos/1.jpg`,
        `img/photos/2.jpg`,
        `img/photos/3.jpg`,
        `img/photos/4.jpg`,
        `img/photos/5.jpg`
      ]
    },
    options = {
      type: `Bus`,
      offers: [
        {
          name: `Add luggage`,
          price: 30,
        },
        {
          name: `Switch to comfort class`,
          price: 100,
        },
        {
          name: `Add meal`,
          price: 15,
        },
        {
          name: `Choose seats`,
          price: 5,
        },
        {
          name: `Travel by train`,
          price: 40,
        }
      ]
    },
  } = tripPoint;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${createTripPointTypeListTemplate(TRANSFER_TYPES)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${createTripPointTypeListTemplate(ACTIVITY_TYPES)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} to
          </label>
          <input class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value=""
            list="destination-list-1"
          >
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input
            class="event__input  event__input--time" id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${humanizeDate(dateStart)}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${humanizeDate(dateFinish)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value="${price === 0 ? `` : price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>

        ${createTripPointEditButtonsTemplate(tripPoint)}
      </header>
      ${createTripPointDetailsTemplate(options.offers, destination)}
    </form>`
  );
};
