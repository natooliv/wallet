import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  total = () => {
    const { expenses } = this.props;

    const noExpenses = 0;
    if (expenses.length !== 0) {
      const values = expenses.map((expense) => (expense.value
        * expense.exchangeRates[expense.currency].ask));
      const total = values.reduce((acc, value) => acc + Number(value), 0);
      return total.toFixed(2);
    } return noExpenses.toFixed(2);
  };

  render() {
    const { userLogin } = this.props;
    return (
      <div className="header">
        <div>
          <span className="email" data-testid="email-field">{userLogin.email}</span>
          <span className="total" data-testid="total-field">{this.total()}</span>
          <span className="total" data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userLogin: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
