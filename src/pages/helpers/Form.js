import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Form extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: '',
  //     password: '',
  //     buttonEnabled: false,
  //   };
  // }

  // handleChange = ({ target }) => {
  //   const { name } = target;
  //   this.setState({ [name]: target.value }, this.enableButton);
  // }

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

  // clickButton = (event) => {
  //   event.preventDefault();
  //   const { history, storeUser } = this.props;
  //   const { user } = this.state;
  //   storeUser(user);
  //   history.push('/carteira');
  // }

  render() {
    // const { user, password, buttonEnabled } = this.state;
    return (
      <div>
        <label htmlFor="spend-info">
          <input
            type="number"
            name="value"
            data-testid="value-input"
            placeholder="Valor"
            // value={ user }
            // onChange={ this.handleChange }
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição"
            // value={ password }
            // onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              data-testid="currency-input"
            >
              <option>
                BRL
              </option>
            </select>
          </label>
          <label htmlFor="method">
            Metodo de pagamento
            <select
              name="method"
              data-testid="method-input"
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
              name="method"
              data-testid="tag-input"
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
        </label>
      </div>
    );
  }
}

// Login.propTypes = {
//   storeUser: PropTypes.func.isRequired,
//   history: PropTypes.objectOf(PropTypes.any).isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   storeUser: (user) => { dispatch(userName(user)); },
// });

export default connect(null, null)(Form);
