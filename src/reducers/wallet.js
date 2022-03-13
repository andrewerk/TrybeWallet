import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  LOAD_CURRENCIES,
  EDIT_EXPENSE,
  EDIT_EXPENSE_FINISHED } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOAD_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state, expenses: state.expenses.concat(action.expense) };
  case DELETE_EXPENSE:
    return {
      expenses: action.payload };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: action.payload };
  case EDIT_EXPENSE_FINISHED:
    return {
      ...state,
      expenses: state.expenses.map((expense) => (expense.id === state.edit
        ? { ...action.payload, exchangeRates: expense.exchangeRates } : expense)),
      edit: false };
  default:
    return { ...state };
  }
}

export default wallet;
