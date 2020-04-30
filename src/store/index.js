import Vue from 'vue';
import Vuex from 'vuex';
import { ADD, CHANGE_THEME } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basket: [],
    theme: {
      light: true,
      dark: false,
    },
  },
  getters: {
    totalPrice(state) {
      let result = 0;
      state.basket.map(({ price, quantity }) => {
        if (quantity > 1) {
          price = price * quantity;
        }
        result += +price;
      });
      return result.toFixed(2);
    },
    totalWeight(state) {
      let result = 0;
      state.basket.map(({ unit, quantity }) => {
        if (unit.slice(-2) === 'kg') {
          const quantity = Number(unit.replace(/[^0-9.]+/g, ''));
          result += quantity;
        } else if (unit.slice(-2) === ' g') {
          let quantity = Number(unit.replace(/[^0-9]+/g, '')) / 1000;
          result += quantity;
        }
        result = result * quantity;
      });

      Number.isInteger(result) ? result.toFixed(0) : result.toFixed(0);

      return result + ' Kg';
    },
  },
  mutations: {
    [ADD](state, product) {
      let inBasket = false;
      state.basket.map((item) => {
        if (item._id === product._id) {
          item.quantity += 1;
          inBasket = true;
        }
      });

      if (!inBasket) {
        state.basket.push(product);
      }
    },
    [CHANGE_THEME](state) {
      state.theme.light = !state.theme.light;
      state.theme.dark = !state.theme.dark;
    },
  },
  actions: {
    add(context, payload) {
      context.commit(ADD, payload);
    },
    changeTheme(context) {
      context.commit(CHANGE_THEME);
    },
  },
});
