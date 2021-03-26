import products from '../data/product.json';
import { errorMessages } from '../store/variables';

/**
 * Receives user input.
 * Uses integers for current page items amount,
 * decimals for max price and letters for product search.
 *
 * Checks network connection.
 *
 * @param {string} payload
 * or
 * @param {number} payload
 */
export default async function findProducts(payload) {
  this.filter = payload;
  this.loading = true;
  this.network = true;
  const data = products.map(product => product);

  try {
    if (payload) {
      let res;
      if (typeof payload === 'number') {
        if (Number.isInteger(payload)) {
          res = data.slice(0, payload);
        } else {
          res = data.filter(({ price }) => +price < payload);
        }
      } else {
        res = data.filter(({ name }) => name.toLowerCase().includes(payload));
      }

      this.products = res;
    } else {
      this.products = data.slice(50);
    }
  } catch ({ message }) {
    if (errorMessages.NETWORK_ERROR === message) this.network = false;
    throw new Error(message);
  } finally {
    this.loading = false;
  }
}
