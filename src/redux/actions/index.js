export const USER = 'USER';

export const user = (email) => ({
  type: USER,
  payload: email,
});
export const addExpense = (payload) => ({ type: 'ADD_EXPENSE', payload });
export const deleteExpense = (id) => ({ type: 'DELETE_EXPENSE', id });

export const editExpense = (id) => ({ type: 'EDIT_EXPENSE', id });

export const fetchCoins = (currencies) => ({ type: 'ADD_CURRENCES', currencies });

export const saveEditExpense = () => ({});

const API_URL = 'https://economia.awesomeapi.com.br/json/all';

// export const fetchApi = () => fetch(API_URL)
//   .then((response) => response.json()).then((data) => data);

// https://economia.awesomeapi.com.br/json/all'

export const fetchApi = () => async (dispatch) => {
  const response = await fetch(API_URL);
  const data = await response.json();
  const currencies = Object.keys(data).filter((moedas) => moedas !== 'USDT');
  console.log(currencies);
  dispatch((fetchCoins(currencies)));
};
