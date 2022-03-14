import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userName } from '../actions';
import logo from '../trybe-logo.png';
import wallet from '../wallet.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      buttonEnabled: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value }, this.enableButton);
  }

  enableButton = () => {
    const minPass = 6;
    const emailCheck = /\S+@\S+\.\S+/;
    const { user, password } = this.state;
    if (emailCheck.test(user) && password.length >= minPass) {
      this.setState({ buttonEnabled: true });
    } else {
      this.setState({ buttonEnabled: false });
    }
  }

  clickButton = (event) => {
    event.preventDefault();
    const { history, storeUser } = this.props;
    const { user } = this.state;
    storeUser(user);
    history.push('/carteira');
  }

  render() {
    const { user, password, buttonEnabled } = this.state;
    return (
      <form>
        <label htmlFor="login" className="login">
          <img
            src={ logo }
            alt="trybe-logo"
            className="logo"
          />
          <img
            src={ wallet }
            alt="wallet"
            className="wallet-logo"
          />
          Para utilizar o serviço, faça o login com seu endereço de email válido e senha
          <input
            type="email"
            name="user"
            data-testid="email-input"
            placeholder="Nome de Usuário"
            value={ user }
            onChange={ this.handleChange }
            className="login-input"
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
            className="login-input"
          />
          <button
            type="submit"
            disabled={ !buttonEnabled }
            onClick={ this.clickButton }
            className="login-button"
          >
            Entrar
          </button>
        </label>
      </form>
    );
  }
}

Login.propTypes = {
  storeUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  storeUser: (user) => { dispatch(userName(user)); },
});

export default connect(null, mapDispatchToProps)(Login);
