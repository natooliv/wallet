import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const valorTestId = 'value-input';
const testIdDescription = 'description-input';
const currencyTestId = 'currency-input';
const methodTestId = 'method-input';
const tagTestId = 'tag-input';

const emailValido = 'mail@mail.com';
// aqui meu initialState é o meu estado inicial
// que eu preciso para fazer os meus testes
// ele é um objeto que tem o user e o wallet
// o user tem o email
// o wallet tem o currencies, expenses, editor e editExpense
// o expenses é um array de objetos
// cada objeto tem o id, value, description, currency, method, tag e exchangeRates
// o exchangeRates é um objeto que tem o USD
// o USD tem o ask e o name
// o editor é um boolean
// o editExpense é um objeto
// o editExpense tem o id, value, description, currency, method, tag e exchangeRates

const InitialState = {
  user: {
    email: emailValido,
  },
  wallet: {
    currencies: [],
    expenses: [
      {
        id: 0,
        value: '1',
        description: 'Praia',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: {
          USD: {
            ask: '5',
            name: 'Dolar Americano/Real Brasileiro',
          },
        },
      },
      {
        id: 1,
        value: '2',
        description: 'Uber',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Transporte',
        exchangeRates: {
          USD: {
            ask: '5',
            name: 'Dolar Americano/Real Brasileiro',
          },
        },
      },
    ],
    editor: false,
    editExpense: {
      id: 0,
    },
  },
};
// aqui na linnha 73 eu estou fazendo um mock do fetch
  // eu estou dizendo que quando o fetch for chamado
  // ele vai retornar o mockData que eu importei lá em cima

describe('2 - Tabela de Despesas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Será validado que a tabela de despesas é renderizada com sucesso', async () => {
    const store = createStore(
      rootReducer,
      InitialState,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    const botaoEditar = screen.queryAllByRole('cell', { name: /editar/i })[1].childNodes.item(0);
    const deleteButton = screen.queryAllByRole('cell', { name: /Excluir/i })[0].childNodes.item(1);
    const salvaAi = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(botaoEditar).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(salvaAi).toBeInTheDocument();

    act(() => {
      userEvent.click(botaoEditar);
    });

    expect(salvaAi).toHaveTextContent(/Editar despesa/i);

    const { wallet } = store.getState();
    expect(wallet.editor).toBeTruthy();
    expect(wallet.editExpense.id).toBe(1);

    const inputValor = screen.getByTestId(valorTestId);
    const inputDescription = screen.getByTestId(testIdDescription);
    const currencyInput = screen.getByTestId(currencyTestId);
    const metodo = screen.getByTestId(methodTestId);
    const inputTag = screen.getByTestId(tagTestId);

    expect(inputValor.value).toBe('2');
    expect(inputDescription.value).toBe('Ifood');
    expect(currencyInput.value).toBe('USD');
    expect(metodo.value).toBe('Dinheiro');
    expect(inputTag.value).toBe('Transporte');

    userEvent.clear(inputValor);
    userEvent.type(inputValor, '4');
    userEvent.clear(inputDescription);
    userEvent.type(inputDescription, 'AiqFome');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(metodo, 'Cartão de crédito');
    userEvent.selectOptions(inputTag, 'Alimentação');

    act(() => {
      userEvent.click(salvaAi);
    });

    const { expenses } = store.getState().wallet;

    expect(expenses).toHaveLength(2);
    expect(expenses[1].value).toBe('4');
    expect(expenses[1].description).toBe('AiqFome');
    expect(expenses[1].currency).toBe('USD');
    expect(expenses[1].method).toBe('Cartão de crédito');
    expect(expenses[1].tag).toBe('Alimentação');

    act(() => {
      userEvent.click(deleteButton);
    });

    expect(expenses).toHaveLength(2);
  });
});
