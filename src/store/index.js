import Vue from 'vue';
import Vuex from 'vuex';
import { mutations, actions } from './variables';
import getters from './getters';
import updateLocalStorage from '../local-storage/update-product';
import useLocalStorage from '../local-storage/use-product';

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
    [mutations.CHANGE_THEME]({ theme }) {
      theme.light = !theme.light;
      theme.dark = !theme.dark;

      localStorage.setItem('theme', JSON.stringify(theme));
    },
    [mutations.SET_BACKGROUND](state, { light }) {
      const darkColor = '#2c3e50';
      const lightColor = '#f4f4f4';

      if (light) {
        const lightApp = document.querySelector('#app');
        lightApp.style.color = darkColor;
        lightApp.style.backgroundColor = lightColor;
      } else if (!light) {
        const darkApp = document.querySelector('#app');
        darkApp.style.color = lightColor;
        darkApp.style.backgroundColor = darkColor;
      }
    },
    [mutations.INCREMENT](state, payload) {
      if (payload) {
        state.productsAmount = payload;
      } else {
        state.productsAmount += 1;
        localStorage.setItem('total-products', state.productsAmount);
      }
    },
    [mutations.DECREMENT](state, payload) {
      if (payload) {
        state.productsAmount = payload;
      } else {
        state.productsAmount -= 1;
        localStorage.setItem('total-products', state.productsAmount);
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

        if (basket.length === 0) {
          localStorage.removeItem('total-products');
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
  actions: {
    [actions.CHANGE_THEME](context) {
      context.commit(mutations.CHANGE_THEME);
    },
    [actions.SET_BACKGROUND](context, payload) {
      context.commit(mutations.SET_BACKGROUND, payload);
    },
    [actions.ADD_PRODUCT](context, payload) {
      context.commit(mutations.ADD_PRODUCT, payload);
    },
    [actions.REMOVE_PRODUCT](context, id) {
      context.commit(mutations.REMOVE_PRODUCT, id);
    },
    [actions.INCREMENT](context, payload) {
      context.commit(mutations.INCREMENT, payload);
    },
    [actions.DECREMENT](context, payload) {
      context.commit(mutations.DECREMENT, payload);
    },
    [actions.TOGGLE_TOOLTIP](context, payload) {
      context.commit(mutations.TOGGLE_TOOLTIP, payload);
    },
    [actions.FILL_BASKET](context, payload) {
      context.commit(mutations.FILL_BASKET, payload);
    },
    [actions.HIDE_BASKET](context, payload) {
      context.commit(mutations.HIDE_BASKET, payload);
    },
  },
});
