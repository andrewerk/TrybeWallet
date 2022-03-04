import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userName } from '../actions';

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
    const { user } = this.state;
    const { history, storeUser } = this.props;
    event.preventDefault();
    storeUser(user);
    history.push('/carteira');
  }

  render() {
    const { user, password, buttonEnabled } = this.state;
    return (
      <div>
        <label htmlFor="login">
          <input
            type="email"
            name="user"
            data-testid="email-input"
            placeholder="Nome de Usuário"
            value={ user }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="password"
            data-testid="password-input"
            placeholder="Nome de Senha"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ !buttonEnabled }
            onClick={ this.clickButton }
          >
            Entrar
          </button>
        </label>
      </div>
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
