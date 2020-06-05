import { MUTATIONS } from './variables';

export default {
  /**
   * Set theme on state and localStorage.
   *
   * @param {object} payload theme
   */
  [MUTATIONS.CHANGE_THEME](state, payload) {
    state.theme = payload;
    localStorage.theme = JSON.stringify(payload);
  },
  /**
   * Increment the total amount of products.
   * Update this amount in the state and localStorage
   *
   * @param {number} payload
   */
  [MUTATIONS.INCREMENT](state, payload) {
    if (payload) {
      state.productsAmount = payload;
    } else {
      state.productsAmount += 1;
      localStorage.totalProducts = JSON.stringify(state.productsAmount);
    }
  },
  /**
   * Decrement the total amount of products.
   * Update this amount in the state and localStorage
   *
   * @param {number} payload
   */ [MUTATIONS.DECREMENT](state, payload) {
    if (payload) {
      state.productsAmount = payload;
    } else {
      state.productsAmount -= 1;
      localStorage.totalProducts = JSON.stringify(state.productsAmount);
    }
  },
  /**
   * Add product to the basket.
   * If the product is in the basket. Increase the amount.
   * Update the basket list in the state and localStorage.
   *
   * @param {object} product
   */
  [MUTATIONS.ADD_PRODUCT](state, product) {
    let inBasket = false;

    const currentBasket = state.basket.map((item) => {
      if (item._id === product._id) {
        item.quantity += 1;
        inBasket = true;
      }
      return item;
    });

    if (inBasket) {
      localStorage.basket = JSON.stringify(currentBasket);
    } else {
      state.basket.push(product);
      localStorage.basket = JSON.stringify(state.basket);
    }
  },
  /**
   * Remove product from the basket.
   * If the product is in the basket. Decrease the amount.
   * Update the basket list in the state and localStorage.
   *
   * @param {string} id
   */
  [MUTATIONS.REMOVE_PRODUCT]({ basket }, id) {
    basket.map((item) => {
      if (item._id === id) {
        const index = basket.findIndex(({ _id }) => _id === id);
        if (item.quantity !== 1) {
          item.quantity -= 1;
        } else {
          basket.splice(index, 1);
        }
      }
    });

    localStorage.basket = JSON.stringify(basket);
  },
  /**
   * Sets tooltip active state and defines type.
   * Closes tooltip after 6 seconds.
   *
   * @param {string} payload
   */
  [MUTATIONS.TOGGLE_TOOLTIP](state, payload) {
    state.tooltip.active = true;
    state.tooltip.activeType = payload;

    setTimeout(() => {
      state.tooltip.active = false;
      state.tooltip.activeType = '';
    }, 6000);
  },
  [MUTATIONS.FILL_BASKET](state, payload) {
    state.basket = payload;
  },
  [MUTATIONS.HIDE_BASKET](state, payload) {
    state.hideBasket = payload || !state.hideBasket;
  },
};
