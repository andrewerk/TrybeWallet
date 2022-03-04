import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
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
          <button type="submit" disabled={ !buttonEnabled }>Entrar</button>
        </label>
      </div>
    );
  }
}

export default Login;
