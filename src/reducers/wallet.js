const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ITEM_ADD':
    return { ...state, ...action.payload };
  default:
    return { ...state };
  }
}

export default wallet;
