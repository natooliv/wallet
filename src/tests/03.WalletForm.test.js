import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const testIdEmail = 'email-field';
const testIdTotal = 'total-field';
const testIdCurrency = 'header-currency-field';

const testIdValue = 'value-input';
const testIdDescription = 'description-input';
const currencySelectTestId = 'currency-input';
const metodoTestId = 'method-input';
const testIdTag = 'tag-input';
const botaoId = 'save-btn';

const emailValido = 'mail@mail.com';

const initialStateAddOneExpenses = {
  user: {
    email: emailValido,
  },
  wallet: {
    currencies: [],
    expenses: [
      {
        id: 0,
        value: '1',
        description: 'açaí',
        currency: 'USD',
        exchangeRates: {
          USD: {
            ask: '5',
          },
        },
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

const initialState = {
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
          },
        },
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

describe('1 - Wallet teste dos componentes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
  });

  it('1.1 - Teste se é renderizado Header', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddOneExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    expect(screen.getByTestId(testIdEmail)).toBeInTheDocument();
    expect(screen.getByTestId(testIdEmail).innerHTML).toBe(emailValid);
    expect(screen.getByTestId(testIdTotal)).toBeInTheDocument();
    expect(screen.getByTestId(testIdTotal).innerHTML).toBe('5.00');
    expect(screen.getByTestId(testIdCurrency)).toBeInTheDocument();
    expect(screen.getByTestId(testIdCurrency).innerHTML).toBe('BRL');
  });

  it('1.2 - Teste se é renderizado Form', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddOneExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    expect(screen.getByTestId(testIdValue)).toBeInTheDocument();
    expect(screen.getByTestId(testIdDescription)).toBeInTheDocument();
    expect(screen.getByTestId(testIdCurrency)).toBeInTheDocument();
    expect(screen.getByTestId(metodoTestId)).toBeInTheDocument();
    expect(screen.getByTestId(testIdTag)).toBeInTheDocument();
    expect(screen.getByTestId(botaoId)).toBeInTheDocument();

    expect(screen.getByTestId(testIdValue).value).toBe('');
    expect(screen.getByTestId(testIdDescription).value).toBe('');

    const listadeMoedas = [];
    screen.getByTestId(listadeMoedas).childNodes.forEach((option) => {
      listadeMoedas.push(option.innerHTML);
    });
    expect(listadeMoedas).toEqual(Object.keys(mockData).filter((key) => key !== 'USDT'));

    const categoriaLista = [];
    screen.getByTestId(metodoTestId).childNodes.forEach((option) => {
      categoriaLista.push(option.innerHTML);
    });
    expect(categoriaLista).toEqual(['Cartão de crédito', 'Cartão de débito', 'Dinheiro']);

    const metodoLista = [];
    screen.getByTestId(testIdTag).childNodes.forEach((option) => {
      metodoLista.push(option.innerHTML);
    });
    expect(metodoLista).toEqual(['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']);
  });

  it('1.3 - Teste se os nomes do header formulário estão correto', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddOneExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    screen.getByText(/despesas/i);
    screen.getByRole('columnheader', { name: /tag/i });
    screen.getByRole('columnheader', { name: /método de pagamento/i });
    screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    screen.getByRole('columnheader', { name: /valor convertido/i });
    screen.getByRole('columnheader', { name: /moeda de conversão/i });
    screen.getByRole('columnheader', { name: /Editar/i });
    screen.getByRole('columnheader', { name: /Excluir/i });
  });

  it('1.4 - Teste se valor da despesa e renderizado com 2 casa decimais', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddOneExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    expect(screen.getByTestId(testIdTotal).innerHTML).toBe('5.00');
  });

  it('1.5 - Teste se valor da despesa e somado correto', async () => {
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    expect(screen.getByTestId(testIdTotal).innerHTML).toBe('15.00');
  });

  it('1.6 - Teste se ao preencher o formulário de despesa os valores são renderizados', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddOneExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    userEvent.type(screen.getByTestId(testIdValue), '1');
    expect(screen.getByTestId(testIdValue).value).toBe('1');
    userEvent.type(screen.getByTestId(testIdDescription), 'açai');
    expect(screen.getByTestId(testIdDescription).value).toBe('açai');
    userEvent.selectOptions(screen.getByTestId(currencySelectTestId), 'USD');
    expect(screen.getByTestId(currencySelectTestId).value).toBe('USD');
    userEvent.selectOptions(screen.getByTestId(metodoTestId), 'Dinheiro');
    expect(screen.getByTestId(metodoTestId).value).toBe('Dinheiro');
    userEvent.selectOptions(screen.getByTestId(testIdTag), 'Lazer');
    expect(screen.getByTestId(testIdTag).value).toBe('Lazer');
  });

  it('1.7 - Teste se ao preencher o formulário e clicar em salvar, a despesa é adicionada e faz uma requisição para a API', async () => {
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    expect(store.getState().wallet.currencies).toEqual(Object.keys(mockData).filter((key) => key !== 'USDT'));
    expect(screen.getByTestId(testIdTotal).innerHTML).toBe('15.00');

    screen.getByRole('spinbutton', { name: /Valor/i });
    screen.getByRole('combobox', { name: /Moeda/i });
    screen.getByRole('combobox', { name: /Método de pagamento/i });
    screen.getByRole('combobox', { name: /Tag/i });
    screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(screen.getByTestId(testIdValue), '1');
    expect(screen.getByTestId(testIdValue).value).toBe('1');
    userEvent.type(screen.getByTestId(testIdDescription), 'açai');
    expect(screen.getByTestId(testIdDescription).value).toBe('açai');
    userEvent.selectOptions(screen.getByTestId(currencySelectTestId), 'USD');
    expect(screen.getByTestId(currencySelectTestId).value).toBe('USD');
    userEvent.selectOptions(screen.getByTestId(metodoTestId), 'Dinheiro');
    expect(screen.getByTestId(metodoTestId).value).toBe('Dinheiro');
    userEvent.selectOptions(screen.getByTestId(testIdTag), 'Lazer');
    expect(screen.getByTestId(testIdTag).value).toBe('Lazer');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /Adicionar despesa/i }));
    });

    const { expenses } = await store.getState().wallet;
    expect(expenses).toHaveLength(3);
  });

  it('1.8 - Teste se ao clicar em adicionar despesa, os valores são limpos', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddTwoExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    expect(store.getState().wallet.expenses).toHaveLength(2);
  });
});
