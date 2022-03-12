export const ADD_EXPENSE = 'ADD_EXPENSE';
export const USER_NAME = 'USER_INPUT';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';

export const userName = (user) => ({ type: USER_NAME, email: user });

function addExpense(expense) {
  return { type: ADD_EXPENSE, expense };
}

export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, payload: id });

export const loadCurrencies = (payload) => ({ type: LOAD_CURRENCIES, payload });

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
