import { mutations, actionTypes } from './variables';

const actions = {
  [actionTypes.CHANGE_THEME](context, payload) {
    context.commit(mutations.CHANGE_THEME, payload);
  },
  [actionTypes.ADD_PRODUCT](context, payload) {
    context.commit(mutations.ADD_PRODUCT, payload);
  },
  [actionTypes.REMOVE_PRODUCT](context, id) {
    context.commit(mutations.REMOVE_PRODUCT, id);
  },
  [actionTypes.INCREMENT](context, payload) {
    context.commit(mutations.INCREMENT, payload);
  },
  [actionTypes.DECREMENT](context, payload) {
    context.commit(mutations.DECREMENT, payload);
  },
  [actionTypes.TOGGLE_TOOLTIP](context, payload) {
    context.commit(mutations.TOGGLE_TOOLTIP, payload);
  },
  [actionTypes.FILL_BASKET](context, payload) {
    context.commit(mutations.FILL_BASKET, payload);
  },
  [actionTypes.HIDE_BASKET](context, payload) {
    context.commit(mutations.HIDE_BASKET, payload);
  },
};
export default actions;
