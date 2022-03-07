import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <header>
        <h3 data-testid="email-field">{ user }</h3>
        <h3 data-testid="total-field">0</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>);
  }
}
const mapStateToProps = (state) => ({ user: state.user.email });

export default connect(mapStateToProps)(Header);
