import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    total: 0,
  };

  total = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return expenses.reduce((sum, { value, currency, exchangeRates }) => {
        const { ask } = exchangeRates[currency];
        return sum + Number(value) * Number(ask);
      }, 0);
    }
  };

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <span
          data-testid="total-field"
        >
          {this.total() ? this.total().toFixed(2) : total}
        </span>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
Header.propTypes = {
  email: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps)(Header);
