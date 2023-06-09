import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, responseApi, addExpense } from '../redux/actions/index';

// aqui eu preciso importar o fetchApi e o responseApi
// e o addExpense para poder usar no meu componente
// e o connect para poder usar o dispatch
// e o PropTypes para poder usar o propTypes no meu componente.

class Form extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',

  };

  // aqui eu preciso fazer um componentDidMount para poder chamar o fetchApi
  // e o dispatch para poder chamar o fetchApi
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }
  // aqui  handlechange vai ser responsavel por pegar o valor do input
  // e colocar no state do meu componente e o handleClick vai ser responsavel por chamar o dispatch e o addExpense;

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const exchangeRates = await responseApi();
    const objeto = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(addExpense(objeto));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    // aqui eu preciso fazer um render para poder renderizar o meu form e o botão de adicionar despesa e o botão de editar despesa
    // as props que eu preciso passar para o meu form são o currencies que vem do meu mapStateToProps
    // e o dispatch que vem do meu connect
    // e o value, description, currency, method, tag que vem do meu state;
    return (
      <div className="form-container">
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              type="number"
              placeholder="Valor gasto"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              type="text"
              placeholder="Descrição do gasto"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((code, index) => (
                <option key={ index }>{code}</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tipo de gasto:
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          {/* esse botão deve: salvar os valores na aplicação, atualiza
          a soma, salvar a cotação do cambio,
          após salvar o total no header deve ser somado */}
          {
            //  // edit
            //     ? (
            //       <button
            //         className="button is-primary is-small"
            //         type="button"
            //         onClick={ this.handleClick }
            //       >
            //         Editar despesa

            //       </button>
            //     )
            //     : (
            <button
              type="button"
              onClick={ this.handleClick }
              className="form-btn"
            >
              Adicionar despesa
            </button>
            // )
          }
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Form);
