import { ADD_EXPENSE, DELETE_EXPENSE, LOAD_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
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
  default:
    return { ...state };
  }
}

export default wallet;
