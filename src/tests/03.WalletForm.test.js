import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

// Id Header
const emailTestId = 'email-field';
const totalTestId = 'total-field';
const currencyTestId = 'header-currency-field';

// Id do Form de adicionar despesa
const valueTestId = 'value-input';
const descriptionTestId = 'description-input';
const currencySelectTestId = 'currency-input';
const methodSelectTestId = 'method-input';
const tagSelectTestId = 'tag-input';
const btnSaveId = 'save-btn';

const emailValid = 'mail@mail.com';

const initialStateAddOneExpenses = {
  user: {
    email: emailValid,
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

const initialStateAddTwoExpenses = {
  user: {
    email: emailValid,
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

  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  it('1.1 - Teste se é renderizado Header', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddOneExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    expect(screen.getByTestId(emailTestId)).toBeInTheDocument();
    expect(screen.getByTestId(emailTestId).innerHTML).toBe(emailValid);
    expect(screen.getByTestId(totalTestId)).toBeInTheDocument();
    expect(screen.getByTestId(totalTestId).innerHTML).toBe('5.00');
    expect(screen.getByTestId(currencyTestId)).toBeInTheDocument();
    expect(screen.getByTestId(currencyTestId).innerHTML).toBe('BRL');
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
    expect(screen.getByTestId(valueTestId)).toBeInTheDocument();
    expect(screen.getByTestId(descriptionTestId)).toBeInTheDocument();
    expect(screen.getByTestId(currencySelectTestId)).toBeInTheDocument();
    expect(screen.getByTestId(methodSelectTestId)).toBeInTheDocument();
    expect(screen.getByTestId(tagSelectTestId)).toBeInTheDocument();
    expect(screen.getByTestId(btnSaveId)).toBeInTheDocument();

    expect(screen.getByTestId(valueTestId).value).toBe('');
    expect(screen.getByTestId(descriptionTestId).value).toBe('');

    const currencySelectList = [];
    screen.getByTestId(currencySelectTestId).childNodes.forEach((option) => {
      currencySelectList.push(option.innerHTML);
    });
    expect(currencySelectList).toEqual(Object.keys(mockData).filter((key) => key !== 'USDT'));

    const categorySelectList = [];
    screen.getByTestId(methodSelectTestId).childNodes.forEach((option) => {
      categorySelectList.push(option.innerHTML);
    });
    expect(categorySelectList).toEqual(['Cartão de crédito', 'Cartão de débito', 'Dinheiro']);

    const methodSelectList = [];
    screen.getByTestId(tagSelectTestId).childNodes.forEach((option) => {
      methodSelectList.push(option.innerHTML);
    });
    expect(methodSelectList).toEqual(['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']);
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
    expect(screen.getByTestId(totalTestId).innerHTML).toBe('5.00');
  });

  it('1.5 - Teste se valor da despesa e somado correto', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddTwoExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    expect(screen.getByTestId(totalTestId).innerHTML).toBe('15.00');
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
    userEvent.type(screen.getByTestId(valueTestId), '1');
    expect(screen.getByTestId(valueTestId).value).toBe('1');
    userEvent.type(screen.getByTestId(descriptionTestId), 'açai');
    expect(screen.getByTestId(descriptionTestId).value).toBe('açai');
    userEvent.selectOptions(screen.getByTestId(currencySelectTestId), 'USD');
    expect(screen.getByTestId(currencySelectTestId).value).toBe('USD');
    userEvent.selectOptions(screen.getByTestId(methodSelectTestId), 'Dinheiro');
    expect(screen.getByTestId(methodSelectTestId).value).toBe('Dinheiro');
    userEvent.selectOptions(screen.getByTestId(tagSelectTestId), 'Lazer');
    expect(screen.getByTestId(tagSelectTestId).value).toBe('Lazer');
  });

  it('1.7 - Teste se ao preencher o formulário e clicar em salvar, a despesa é adicionada e faz uma requisição para a API', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddTwoExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    expect(store.getState().wallet.currencies).toEqual(Object.keys(mockData).filter((key) => key !== 'USDT'));
    expect(screen.getByTestId(totalTestId).innerHTML).toBe('15.00');

    screen.getByRole('spinbutton', { name: /Valor/i });
    screen.getByRole('combobox', { name: /Moeda/i });
    screen.getByRole('combobox', { name: /Método de pagamento/i });
    screen.getByRole('combobox', { name: /Tag/i });
    screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(screen.getByTestId(valueTestId), '1');
    expect(screen.getByTestId(valueTestId).value).toBe('1');
    userEvent.type(screen.getByTestId(descriptionTestId), 'açai');
    expect(screen.getByTestId(descriptionTestId).value).toBe('açai');
    userEvent.selectOptions(screen.getByTestId(currencySelectTestId), 'USD');
    expect(screen.getByTestId(currencySelectTestId).value).toBe('USD');
    userEvent.selectOptions(screen.getByTestId(methodSelectTestId), 'Dinheiro');
    expect(screen.getByTestId(methodSelectTestId).value).toBe('Dinheiro');
    userEvent.selectOptions(screen.getByTestId(tagSelectTestId), 'Lazer');
    expect(screen.getByTestId(tagSelectTestId).value).toBe('Lazer');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /Adicionar despesa/i }));
    });

    const { expenses } = await store.getState().wallet;
    expect(expenses).toHaveLength(3);
  });

  // se ao clicar em adicionar despesa, e valores são limpos
  it('1.8 - Teste se ao clicar em adicionar despesa, os valores são limpos', async () => {
    const store = createStore(
      rootReducer,
      initialStateAddTwoExpenses,
      applyMiddleware(thunk),
    );
    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });
    // Verifiar se os valores do state expensea
    expect(store.getState().wallet.expenses).toHaveLength(2);
  });
});
