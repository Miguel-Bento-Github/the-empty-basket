import Vue from 'vue';
import Vuex from 'vuex';
import {
  ADD_PRODUCT,
  CHANGE_THEME,
  HIDE_BASKET,
  SET_BACKGROUND,
  TOGGLE_TOOLTIP,
  FILL_BASKET,
  INCREMENT,
  DECREMENT,
  REMOVE_PRODUCT,
} from './mutation-types';
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
    [CHANGE_THEME]({ theme }) {
      theme.light = !theme.light;
      theme.dark = !theme.dark;

      localStorage.setItem('theme', JSON.stringify(theme));
    },
    [SET_BACKGROUND](state, { light }) {
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
    [INCREMENT](state, payload) {
      if (payload) {
        state.productsAmount = payload;
      } else {
        state.productsAmount += 1;
        localStorage.setItem('total-products', state.productsAmount);
      }
    },
    [DECREMENT](state, payload) {
      if (payload) {
        state.productsAmount = payload;
      } else {
        state.productsAmount -= 1;
        localStorage.setItem('total-products', state.productsAmount);
      }
    },
    [ADD_PRODUCT](state, product) {
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
    [REMOVE_PRODUCT]({ basket }, id) {
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
    [TOGGLE_TOOLTIP](state, payload) {
      state.tooltip.active = true;
      state.tooltip.type = payload;

      setTimeout(() => {
        state.tooltip.active = false;
        state.tooltip.type = '';
      }, 6000);
    },
    [FILL_BASKET](state, payload) {
      state.basket = payload;
    },
    [HIDE_BASKET](state, payload) {
      state.hideBasket = payload || !state.hideBasket;
    },
  },
  actions: {
    [CHANGE_THEME](context) {
      context.commit(CHANGE_THEME);
    },
    [SET_BACKGROUND](context, payload) {
      context.commit(SET_BACKGROUND, payload);
    },
    [ADD_PRODUCT](context, payload) {
      context.commit(ADD_PRODUCT, payload);
    },
    [REMOVE_PRODUCT](context, id) {
      context.commit(REMOVE_PRODUCT, id);
    },
    [INCREMENT](context, payload) {
      context.commit(INCREMENT, payload);
    },
    [DECREMENT](context, payload) {
      context.commit(DECREMENT, payload);
    },
    [TOGGLE_TOOLTIP](context, payload) {
      context.commit(TOGGLE_TOOLTIP, payload);
    },
    [FILL_BASKET](context, payload) {
      context.commit(FILL_BASKET, payload);
    },
    [HIDE_BASKET](context, payload) {
      context.commit(HIDE_BASKET, payload);
    },
  },
});
