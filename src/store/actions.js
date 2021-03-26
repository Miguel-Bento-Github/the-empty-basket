import { ACTIONS, MUTATIONS } from './variables';

export default {
  [ACTIONS.CHANGE_THEME](context, payload) {
    context.commit(MUTATIONS.CHANGE_THEME, payload);
  },
  [ACTIONS.ADD_PRODUCT](context, payload) {
    context.commit(MUTATIONS.ADD_PRODUCT, payload);
  },
  [ACTIONS.REMOVE_PRODUCT](context, id) {
    context.commit(MUTATIONS.REMOVE_PRODUCT, id);
  },
  [ACTIONS.INCREMENT](context, payload) {
    context.commit(MUTATIONS.INCREMENT, payload);
  },
  [ACTIONS.DECREMENT](context, payload) {
    context.commit(MUTATIONS.DECREMENT, payload);
  },
  [ACTIONS.TOGGLE_TOOLTIP](context, payload) {
    context.commit(MUTATIONS.TOGGLE_TOOLTIP, payload);
  },
  [ACTIONS.FILL_BASKET](context, payload) {
    context.commit(MUTATIONS.FILL_BASKET, payload);
  },
  [ACTIONS.HIDE_BASKET](context, payload) {
    context.commit(MUTATIONS.HIDE_BASKET, payload);
  },
};
