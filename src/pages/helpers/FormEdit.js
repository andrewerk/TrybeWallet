import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpenseFinished } from '../../actions';

class FormEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { edit, expenses } = this.props;
    this.setState({
      value: expenses[edit].value,
      description: expenses[edit].description,
      currency: expenses[edit].currency,
      method: expenses[edit].method,
      tag: expenses[edit].tag,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { editExpenseFinishedProp, currencies } = this.props;
    return (
      <form className="input-form-edit">
        <label htmlFor="spend-info">
          <input
            type="text"
            name="value"
            data-testid="value-input"
            placeholder="Valor"
            value={ value }
            onChange={ this.handleChange }
            className="form-item"
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição"
            value={ description }
            onChange={ this.handleChange }
            className="form-item"
          />
          <label htmlFor="currency" className="form-item">
            Moeda
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
                // currencyItem !== 'USDT'
                  <option key={ currencyItem }>
                    { currencyItem }
                  </option>))}
            </select>
          </label>
          <label htmlFor="method" className="form-item">
            Metodo de pagamento
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
              className="form-item-select"
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
          <label htmlFor="tag" className="form-item">
            Tipo
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
              className="form-item-select"
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
            className="form-item"
            onClick={ () => editExpenseFinishedProp({
              value,
              description,
              currency,
              method,
              tag,
            }) }
          >
            Editar despesa
          </button>
        </label>
      </form>
    );
  }
}

FormEdit.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  editExpenseFinishedProp: PropTypes.func.isRequired,
  edit: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  editExpenseFinishedProp: (expense) => { dispatch(editExpenseFinished(expense)); },
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
  currencies: state.wallet.currencies });

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);
