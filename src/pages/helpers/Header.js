import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { user, expenses } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{ user }</h3>
        <h3 data-testid="total-field">
          {
            expenses.reduce((acc, { value, exchangeRates, currency }) => {
              const { ask } = exchangeRates[currency];
              acc += (Number(value) * Number(ask));
              return acc;
            }, 0)
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
