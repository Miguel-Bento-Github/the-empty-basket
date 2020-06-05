const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CHANGE_THEME = 'CHANGE_THEME';
const HIDE_BASKET = 'HIDE_BASKET';
const FILL_BASKET = 'FILL_BASKET';
const TOGGLE_TOOLTIP = 'TOGGLE_TOOLTIP';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const NETWORK_ERROR = 'Network Error';

export const mutations = {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CHANGE_THEME,
  HIDE_BASKET,
  FILL_BASKET,
  TOGGLE_TOOLTIP,
  INCREMENT,
  DECREMENT,
};

export const actionTypes = {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CHANGE_THEME,
  HIDE_BASKET,
  FILL_BASKET,
  TOGGLE_TOOLTIP,
  INCREMENT,
  DECREMENT,
};

export const measurementUnits = {
  grams: 'g',
  kilograms: 'kg',
  milliliters: 'ml',
  liters: 'l',
};

export const errorMessages = {
  NETWORK_ERROR,
};
