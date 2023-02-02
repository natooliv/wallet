const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpense: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'ADD_CURRENCES':
    return { ...state, currencies: action.currencies };
  case 'DELETE_EXPENSE':
    return {
      ...state, expenses: state.expenses.filter((expense) => expense.id !== action.id) };
  case 'EDIT_EXPENSE':
    return {
      ...state, editExpenses: console.log('wallet') };
  default:
    return state;
  }
}

export default wallet;
