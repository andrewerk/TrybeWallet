export const ADD_EXPENSE = 'ADD_EXPENSE';
export const USER_NAME = 'USER_INPUT';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';
export const EDIT_EXPENSE_FINISHED = 'EDIT_EXPENSE_FINISHED';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const userName = (user) => ({ type: USER_NAME, email: user });

function addExpense(expense) {
  return { type: ADD_EXPENSE, expense };
}

export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, payload: id });

export const loadCurrencies = (payload) => ({ type: LOAD_CURRENCIES, payload });

export function expenseFormating(currencies, expenseData) {
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

export const editExpense = (id) => ({ type: EDIT_EXPENSE, payload: id });
export const editExpenseFinished = (expense) => ({ type: EDIT_EXPENSE_FINISHED,
  payload: expense });
