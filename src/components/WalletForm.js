import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/actions';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      formInfo: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { formInfo } = this.state;
    this.setState({
      formInfo: {
        ...formInfo,
        [name]: value,
      },
    });
  }

  handleClick() {
    const { formInfo } = this.state;
    const { id } = formInfo;

    this.setState({
      formInfo: {
        ...formInfo,
        id: id + 1,
        value: 0,
        description: '',
      },
    });
  }

  render() {
    const { formInfo } = this.state;
    const { currencies } = this.props;
    const { value, description, currency } = formInfo;
    console.log(currencies);
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
                <option data-testid={ code } key={ index }>{code}</option>
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
          <button
            type="button"
            onClick={ this.handleClick }
            className="form-btn"
          >
            Adicionar despesa
          </button>

        </form>
      </div>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
});

export default connect(mapStateToProps)(Form);
