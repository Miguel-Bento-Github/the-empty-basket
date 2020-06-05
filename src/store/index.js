import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './variables';
import getters from './getters';
import updateLocalStorage from '../local-storage/update-product';
import useLocalStorage from '../local-storage/use-product';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basket: [],
    hideBasket: false,
    productsAmount: 0,
    theme: {
      light: true,
      dark: false,
    },
    tooltip: {
      active: false,
      type: '',
    },
  },
  getters: getters,
  mutations: {
    [mutations.CHANGE_THEME](state, payload) {
      state.theme = payload;

      localStorage.setItem('theme', JSON.stringify(payload));
    },
    [mutations.INCREMENT](state, payload) {
      if (payload) {
        state.productsAmount = payload;
      } else {
        state.productsAmount += 1;
        localStorage.setItem('totalProducts', state.productsAmount);
      }
    },
    [mutations.DECREMENT](state, payload) {
      if (payload) {
        state.productsAmount = payload;
      } else {
        state.productsAmount -= 1;
        localStorage.setItem('totalProducts', state.productsAmount);
      }
    },
    [mutations.ADD_PRODUCT](state, product) {
      let id = '';
      let inBasket = false;

      state.basket.map((item) => {
        if (item._id === product._id) {
          id = item._id;
          item.quantity += 1;
          inBasket = true;
        }
      });

      if (inBasket) {
        updateLocalStorage(id);
      } else {
        state.basket.push(product);
        useLocalStorage(state.basket);
      }
    },
    [mutations.REMOVE_PRODUCT]({ basket }, id) {
      basket.map((item) => {
        if (item._id === id) {
          const index = basket.findIndex((product) => product._id === id);
          if (item.quantity !== 1) {
            item.quantity -= 1;
          } else {
            basket.splice(index, 1);
          }
        }
      });

      useLocalStorage(basket);
    },
    [mutations.TOGGLE_TOOLTIP](state, payload) {
      state.tooltip.active = true;
      state.tooltip.type = payload;

      setTimeout(() => {
        state.tooltip.active = false;
        state.tooltip.type = '';
      }, 6000);
    },
    [mutations.FILL_BASKET](state, payload) {
      state.basket = payload;
    },
    [mutations.HIDE_BASKET](state, payload) {
      state.hideBasket = payload || !state.hideBasket;
    },
  },
  actions: actions,
});
