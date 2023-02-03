import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>
                    {expense.exchangeRates[expense.currency].name}
                  </td>
                  <td>
                    {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                  </td>
                  <td>
                    {Number(expense.value * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      className="button-real"
                      type="button"
                      data-testid="edit-btn"
                    // onClick={ editExpense }
                    >
                      Editar
                    </button>
                    <button
                      className="button-excluir"
                      type="button"
                      data-testid="delete-btn"
                    // onClick={ deletItem }
                    >
                      Excluir

                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,

  };
}

Table.propTypes = {
  expenses: Proptypes.arrayOf.isRequired,
  //  deletItem: Proptypes.func.isRequired,
  //  editExpense: Proptypes.func.isRequired,
};
export default connect(mapStateToProps)(Table);
