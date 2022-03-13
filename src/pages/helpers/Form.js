import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCurrencies,
  loadCurrencies,
  editExpenseFinished,
  expenseFormating } from '../../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencies: false,
    };
  }

  async componentDidMount() {
    const { loadCurrenciesProp } = this.props;
    const responseJson = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await responseJson.json();
    const currencies = Object.keys(response);
    this.setState({ currencies });
    loadCurrenciesProp(currencies);
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  clickButton = () => {
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { fetchCurrenciesProp, expenses } = this.props;
    this.setState({ id: expenses.length + 1 }, fetchCurrenciesProp({
      id, value, description, currency, method, tag }));
    this.setState({ value: '' });
  }

  render() {
    const { editExpenseFinishedProp, edit, expenses } = this.props;
    if (edit || edit === 0) {
      this.setState({
        id: expenses[edit].id,
        value: expenses[edit].value,
        description: expenses[edit].description,
        currency: expenses[edit].currency,
        method: expenses[edit].method,
        tag: expenses[edit].tag,
      });
    }
    const { description, value, currency, method, tag, currencies } = this.state;
    return (
      <div>
        <label htmlFor="spend-info">
          <input
            type="text"
            name="value"
            data-testid="value-input"
            placeholder="Valor"
            value={ edit || edit === 0 ? expenses[edit].value : value }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição"
            value={ edit || edit === 0 ? expenses[edit].description : description }
            onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              // value={ edit || edit === 0 ? expenses[edit].currency : currency }
            >
              { currencies && currencies.filter((currencyItem) => currencyItem !== 'USDT')
                .map((currencyItem) => (
                // currencyItem !== 'USDT'
                  <option key={ currencyItem }>
                    { currencyItem }
                  </option>))}
            </select>
          </label>
          <label htmlFor="method">
            Metodo de pagamento
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ edit || edit === 0 ? expenses[edit].method : method }
            >
              <option>
                Dinheiro
              </option>
              <option>
                Cartão de crédito
              </option>
              <option>
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            Tipo
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ edit || edit === 0 ? expenses[edit].tag : tag }
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
            onClick={ edit || edit === 0
              ? () => editExpenseFinishedProp(expenseFormating(currencies, {
                value,
                description,
                currency,
                method,
                tag,
              })) : this.clickButton }
          >
            Adicionar despesa
          </button>
        </label>
      </div>
    );
  }
}

Form.propTypes = {
  fetchCurrenciesProp: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  loadCurrenciesProp: PropTypes.func.isRequired,
  editExpenseFinishedProp: PropTypes.func.isRequired,
  edit: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProp: (expense) => { dispatch(fetchCurrencies(expense)); },
  loadCurrenciesProp: (currencies) => { dispatch(loadCurrencies(currencies)); },
  editExpenseFinishedProp: (expense) => { dispatch(editExpenseFinished(expense)); },
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses, edit: state.wallet.edit });

export default connect(mapStateToProps, mapDispatchToProps)(Form);
