const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpense: [],
};
// aqui  a function wallet recebe o state e o action
  // o state é o estado inicial que é o INITIAL_STATE
  // o action é o que eu vou fazer com o meu state
  // o meu state é um objeto que tem as chaves currencies, expenses e editExpense
  // o meu action é um objeto que tem as chaves type e payload
  // o meu type é uma string que vai dizer qual ação eu vou fazer com o meu state
  // o meu payload é o que eu vou adicionar ao meu state
  // assim eu vou ter um objeto com as chaves currencies, expenses e editExpense
  // e cada chave vai ter um valor
  // o meu valor de currencies é um array vazio
  // o meu valor de expenses é um array vazio
  // o meu valor de editExpense é um array vazio
  // o meu type é uma string que vai dizer qual ação eu vou fazer com o meu state
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, { ...action.payload }] };
  case 'ADD_CURRENCES':
    return { ...state, currencies: action.currencies };
  case 'DELETE_EXPENSE':
    return {
      ...state, expenses: state.expenses.filter((expense) => expense.id !== action.id) };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          Object.assign(expense, action.payload);
          return expense;
        }
        return expense;
      }),
    };
  case 'EXPENCES':
    return {
      ...state, expenses: [...state.expenses, action.expenses],
    };

  default:
    return state;
  }
}

export default wallet;
