import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../index.css';

class Header extends React.Component {
  render() {
    const { user, expenses } = this.props;
    return (
      <header className="header">
        <h3>Currencies Wallet</h3>
        <h3 data-testid="email-field">{ user }</h3>
        <h3 data-testid="total-field">
          Total:
          { ' ' }
          {
            expenses.reduce((acc, { value, exchangeRates, currency }) => {
              const { ask } = exchangeRates[currency];
              acc += (Number(value) * Number(ask));
              return acc;
            }, 0).toFixed(2)
          }

        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>);
  }
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.email, expenses: state.wallet.expenses });

export default connect(mapStateToProps)(Header);
