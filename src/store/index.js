import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';

import actions from './actions';
import mutations from './mutations';

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
  mutations: mutations,
  actions: actions,
});
