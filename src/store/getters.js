import { measurementUnits } from './variables';

/**
 * Maps through the products in the state and multiplies it's price with quantity.
 *
 * @param {object} state
 * @returns {number}
 */
function totalPrice(state) {
  let result = 0;
  state.basket.map(({ price, quantity }) => {
    if (quantity > 1) {
      price = price * quantity;
    }
    result += +price;
  });
  return result.toFixed(2);
}

/**
 * This function requires string control.
 * This is not ideal but we have no control over the data as it's scrapped.
 *
 * Checks if measurement unit is grams or milliliters.
 * If so, will check for the existence of a multiplier symbol 'x'.
 * Some items measurement units have a factor and require the extra logic.
 * example: 12 x 100grams
 *
 * Without multiplier it'll multiply quantity with unit amount and divide it by 1000
 *
 * For kilograms and liters will multiply quantity with unit
 *
 * @param {object} state
 * @returns {string} weight in kilograms
 */
function totalWeight(state) {
  /**
   * @param {string} whom
   * @param {number} from slice starting position
   * @param {number} to slice ending position
   * @returns {string}
   */
  const unitType = (whom, from, to) => {
    return whom
      .toLowerCase()
      .slice(from, to)
      .split(' ')
      .join('');
  };

  let result = 0;

  state.basket.map(({ unit, quantity }) => {
    const toNumber = (item) => Number(item.replace(/[^0-9.]+/g, ''));

    if (
      unitType(unit, -2) === measurementUnits.grams ||
      unitType(unit, -2) === measurementUnits.milliliters
    ) {
      if (unitType(unit, 2, 4) === 'x') {
        const [factor, grams] = unit.split('x');

        result += ((factor * toNumber(grams)) / 1000) * quantity;
      } else {
        result += (toNumber(unit) * quantity) / 1000;
      }
    } else if (
      unitType(unit, -2) === measurementUnits.kilograms ||
      unitType(unit, -2) === measurementUnits.liters
    ) {
      result += toNumber(unit) * quantity;
    }
  });

  return `${Math.round(result * 10) / 10} ${measurementUnits.kilograms}`;
}

export default {
  totalPrice,
  totalWeight,
};
