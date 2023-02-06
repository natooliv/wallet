import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mockEmailValid = 'mail@mail.com';
const mockEmailInvalid = 'mailmail.com';
const passwordValid = '123456';
const passwordInvalid = '12345';
const idTestEmail = 'email-input';
const idTestPassword = 'password-input';

describe('1 - Teste elemento na tela de login', () => {
  it('1.1 - Teste os elemnto da tela de login', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('heading', { name: 'Login', level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId(idTestEmail)).toBeInTheDocument();
    expect(screen.getByTestId(idTestPassword)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('1.2 - Teste se o botão de login está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });

  it('1.3 - Teste se o botão de login está habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idTestEmail);
    const passwordInput = screen.getByTestId(idTestPassword);
    userEvent.type(emailInput, mockEmailValid);
    userEvent.type(passwordInput, passwordValid);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeEnabled();
  });

  it('1.5 - Teste se o botão não está habilitado com email inválido', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idTestEmail);
    const passwordInput = screen.getByTestId(idTestPassword);
    userEvent.type(emailInput, mockEmailInvalid);
    userEvent.type(passwordInput, passwordValid);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });

  it('1.6 - Teste se o botão não está habilitado com senha inválida', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idTestEmail);
    const passwordInput = screen.getByTestId(idTestPassword);
    userEvent.type(emailInput, mockEmailValid);
    userEvent.type(passwordInput, passwordInvalid);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });

  it('1.7 - Teste se ao clicar no botão de login, a rota muda para a página de carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(idTestEmail);
    const passwordInput = screen.getByTestId(idTestPassword);
    userEvent.type(emailInput, mockEmailValid);
    userEvent.type(passwordInput, passwordValid);
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
