const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return { ...state, isFetching: true };
  case 'ADD_EXPENSE':
    return {
      ...state, expenses: state.expenses.concat(action.expense), isFetching: false };
  case 'UPDATE_TOTAL':
    return {
      ...state, total: action.total };
  default:
    return { ...state };
  }
}

export default wallet;
