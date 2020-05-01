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
      const unitType = (who, from, to) =>
        who
          .toLowerCase()
          .slice(from, to)
          .split(' ')
          .join('');

      state.basket.map((product) => {
        const weight = (item) => Number(item.replace(/[^0-9.]+/g, ''));
        if (
          unitType(product.unit, -2) === 'g' ||
          unitType(product.unit, -2) === 'ml'
        ) {
          if (unitType(product.unit, 2, 4) === 'x') {
            const units = product.unit.split('x');
            const factor = units[0];
            const grams = weight(units[1]);

            result += ((factor * grams) / 1000) * product.quantity;
            return;
          } else {
            result += (weight(product.unit) * product.quantity) / 1000;
          }
        } else if (
          unitType(product.unit, -2) === 'kg' ||
          unitType(product.unit, -2) === 'l'
        ) {
          result += weight(product.unit) * product.quantity;
        }
      });

      return Math.round(result * 10) / 10 + ' Kg';
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
