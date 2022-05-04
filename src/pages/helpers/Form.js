import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCurrencies,
  loadCurrencies,
  editExpenseFinished } from '../../actions';

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
    const { description, value, currency, method, tag, currencies } = this.state;
    return (
      <form className="input-form">
        <label htmlFor="spend-info">
          <input
            type="text"
            name="value"
            data-testid="value-input"
            placeholder="Value"
            value={ value }
            onChange={ this.handleChange }
            className="form-item"
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Description"
            value={ description }
            onChange={ this.handleChange }
            className="form-item"
          />
          <label htmlFor="currency" className="form-item">
            Currency
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
              className="form-item-select"
            >
              { currencies && currencies.filter((currencyItem) => currencyItem !== 'USDT')
                .map((currencyItem) => (
                  <option key={ currencyItem }>
                    { currencyItem }
                  </option>))}
            </select>
          </label>
          <label htmlFor="method" className="form-item">
            Payment Method
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
              className="form-item-select"
            >
              <option>
                Cash
              </option>
              <option>
                Credit Card
              </option>
              <option>
                Debit Card
              </option>
            </select>
          </label>
          <label htmlFor="tag" className="form-item">
            Type
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
              className="form-item-select"
            >
              <option>
                Food
              </option>
              <option>
                Leisure
              </option>
              <option>
                Work
              </option>
              <option>
                Transport
              </option>
              <option>
                Health
              </option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.clickButton }
            className="form-button"
          >
            Add Expense
          </button>
        </label>
      </form>
    );
  }
}

Form.propTypes = {
  fetchCurrenciesProp: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  loadCurrenciesProp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProp: (expense) => { dispatch(fetchCurrencies(expense)); },
  loadCurrenciesProp: (currencies) => { dispatch(loadCurrencies(currencies)); },
  editExpenseFinishedProp: (expense) => { dispatch(editExpenseFinished(expense)); },
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses, edit: state.wallet.edit });

export default connect(mapStateToProps, mapDispatchToProps)(Form);
