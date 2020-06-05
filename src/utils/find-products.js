import Axios from 'axios';
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
  const url = `${process.env.VUE_APP_API}api/items`;

  try {
    if (payload) {
      let res;
      if (typeof payload === 'number') {
        if (Number.isInteger(payload)) {
          res = await Axios.post(url, { amount: payload });
        } else {
          res = await Axios.post(url, { price: payload });
        }
      } else {
        res = await Axios.post(url, { query: payload });
      }
      this.products = await res.data;
    } else {
      const { data } = await Axios.post(url);
      this.products = data;
    }
  } catch ({ message }) {
    if (errorMessages.NETWORK_ERROR === message) this.network = false;
    throw new Error(message);
  } finally {
    this.loading = false;
  }
}
