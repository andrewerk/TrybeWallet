import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, updateTotal } from '../../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  totalSum = () => {
    const { expenses, updateTotal } = this.props;
    let total = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      const { ask } = exchangeRates[currency];
      total += (Number(value) * Number(ask));
    });
    console.log(total);
    updateTotal(total);
  }

  // enableButton = () => {
  //   const minPass = 6;
  //   const emailCheck = /\S+@\S+\.\S+/;
  //   const { user, password } = this.state;
  //   if (emailCheck.test(user) && password.length >= minPass) {
  //     this.setState({ buttonEnabled: true });
  //   } else {
  //     this.setState({ buttonEnabled: false });
  //   }
  // }

  clickButton = async () => {
    const { fetchCurrencies, expenses } = this.props;
    await fetchCurrencies(this.state);
    this.setState({ id: expenses.length });
    this.updateTotal();
  }

  render() {
    const { description, value, currency, method, tag } = this.state;
    return (
      <div>
        <label htmlFor="spend-info">
          <input
            type="text"
            name="value"
            data-testid="value-input"
            placeholder="Valor"
            value={ value }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição"
            value={ description }
            onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              <option>
                USD
              </option>
            </select>
          </label>
          <label htmlFor="method">
            Metodo de pagamento
            <select
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option>
                Cartão de Crédito
              </option>
              <option>
                Cartão de Débito
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            Tipo
            <select
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option>
                Alimentação
              </option>
              <option>
                Lazer
              </option>
              <option>
                Trabalho
              </option>
              <option>
                Transporte
              </option>
              <option>
                Saúde
              </option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.clickButton }
          >
            Adicionar despesa
          </button>
        </label>
      </div>
    );
  }
}

Form.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.objectOf(PropTypes.any).isRequired,
  updateTotal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (expense) => { dispatch(fetchCurrencies(expense)); },
  updateTotal: (total) => { dispatch(updateTotal(total)); },
});

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps, mapDispatchToProps)(Form);
