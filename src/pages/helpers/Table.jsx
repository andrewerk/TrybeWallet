import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
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
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps, null)(Table);
