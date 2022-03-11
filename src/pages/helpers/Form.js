import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../../actions';

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
    };
  }

  async componentDidMount() {
    const responseJson = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await responseJson.json();
    const currencies = Object.keys(response);
    this.setState({ currencies });
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
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies && currencies.map((currencyItem) => (
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
              value={ method }
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
  fetchCurrenciesProp: PropTypes.func.isRequired,
  expenses: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProp: (expense) => { dispatch(fetchCurrencies(expense)); },
});

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps, mapDispatchToProps)(Form);
