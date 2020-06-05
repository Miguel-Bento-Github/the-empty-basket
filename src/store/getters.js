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
   * Receives a string with a number and measurement unit
   *
   * @param {string} weight
   * @returns {string} measurement unit
   */
  const findMeasurementUnit = (weight) => {
    return weight
      .toLowerCase()
      .slice(-2)
      .split(' ')
      .join('');
  };

  let result = 0;

  state.basket.map(({ unit, quantity }) => {
    const toNumber = (item) => Number(item.replace(/[^0-9.]+/g, ''));

    if (
      findMeasurementUnit(unit) === measurementUnits.grams ||
      findMeasurementUnit(unit) === measurementUnits.milliliters
    ) {
      if (unit.includes('x')) {
        const [factor, grams] = unit.split('x');
        result += ((factor * toNumber(grams)) / 1000) * quantity;
      } else {
        result += (toNumber(unit) * quantity) / 1000;
      }
    } else if (
      findMeasurementUnit(unit) === measurementUnits.kilograms ||
      findMeasurementUnit(unit) === measurementUnits.liters
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
