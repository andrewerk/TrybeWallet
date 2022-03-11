const ADD_EXPENSE = 'ADD_EXPENSE';
const USER_NAME = 'USER_INPUT';

export const userName = (user) => ({ type: USER_NAME, email: user });

function addExpense(expense) {
  return { type: ADD_EXPENSE, expense };
}

function expenseFormating(currencies, expenseData) {
  return { ...expenseData, exchangeRates: currencies };
}

export function fetchCurrencies(expense) {
  return async (dispatch) => {
    const responseJson = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await responseJson.json();
    const expenseToAdd = expenseFormating(response, expense);
    dispatch(addExpense(expenseToAdd));
  };
}
