const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const FAILED_REQUEST = 'FAILED_REQUEST';
const ADD_EXPENSE = 'ADD_EXPENSE';
const USER_NAME = 'USER_INPUT';
const UPDATE_TOTAL = 'UPDATE_TOTAL';

export const userName = (user) => ({ type: USER_NAME, email: user });

function requestCurrencies() {
  return { type: REQUEST_CURRENCIES };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

function addExpense(expense) {
  return { type: ADD_EXPENSE, expense };
}

export function updateTotal(total) {
  return { type: UPDATE_TOTAL, total };
}

function expenseFormating(currencies, expenseData) {
  return { ...expenseData, exchangeRates: currencies };
}

export function fetchCurrencies(expense) {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => expenseFormating(json, expense))
      .then((expenseToAdd) => dispatch(addExpense(expenseToAdd)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}
