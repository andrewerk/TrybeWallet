import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../../actions';

class Table extends React.Component {
  handleDeleting = (id) => {
    const { expenses, deleteExpenseProp } = this.props;
    const expensesUpdated = expenses.filter((expense) => expense.id !== id);
    deleteExpenseProp(expensesUpdated);
  }

  render() {
    const { expenses, editExpenseProp } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th role="columnheader">Descrição</th>
            <th role="columnheader">Tag</th>
            <th role="columnheader">Método de pagamento</th>
            <th role="columnheader">Valor</th>
            <th role="columnheader">Moeda</th>
            <th role="columnheader">Câmbio utilizado</th>
            <th role="columnheader">Valor convertido</th>
            <th role="columnheader">Moeda de conversão</th>
            <th role="columnheader">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses && expenses.map((expense) => (
            <tr key={ expense.id }>
              <td role="cell">
                { expense.description }
              </td>
              <td role="cell">
                { expense.tag }
              </td>
              <td role="cell">
                { expense.method }
              </td>
              <td role="cell">
                { parseFloat(expense.value).toFixed(2) }
              </td>
              <td role="cell">
                { expense.exchangeRates[expense.currency].name }
              </td>
              <td role="cell">
                { parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2) }
              </td>
              <td role="cell">
                { parseFloat(expense.exchangeRates[expense.currency].ask * expense.value)
                  .toFixed(2) }
              </td>
              <td role="cell">Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => this.handleDeleting(expense.id) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
                <button
                  type="button"
                  onClick={ () => editExpenseProp(expense.id) }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteExpenseProp: PropTypes.func.isRequired,
  editExpenseProp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseProp: (id) => { dispatch(deleteExpense(id)); },
  editExpenseProp: (id) => { dispatch(editExpense(id)); },

});

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps, mapDispatchToProps)(Table);
