import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './helpers/Header';
import Form from './helpers/Form';
import FormEdit from './helpers/FormEdit';
import Table from './helpers/Table';
import { storageExpenses } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { storageExpensesProp, user } = this.props;
    const storedExpenses = localStorage.getItem(user);
    console.log(storedExpenses);
    if (storedExpenses && storedExpenses.length > 0) {
      storageExpensesProp(JSON.parse(storedExpenses));
    }
  }

  render() {
    const { edit } = this.props;
    return (
      <div>
        <Header />
        { edit || edit === 0 ? <FormEdit /> : <Form /> }
        <Table />
      </div>);
  }
}

Wallet.propTypes = {
  edit: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  user: PropTypes.string.isRequired,
  storageExpensesProp: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  edit: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  storageExpensesProp: (expenses) => { dispatch(storageExpenses(expenses)); },

});

const mapStateToProps = (state) => ({
  edit: state.wallet.edit, user: state.user.email });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
