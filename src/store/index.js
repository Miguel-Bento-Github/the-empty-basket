import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
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
      activeType: '',
    },
  },
  getters,
  mutations,
  actions,
});
