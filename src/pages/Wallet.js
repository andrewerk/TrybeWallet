import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './helpers/Header';
import Form from './helpers/Form';
import FormEdit from './helpers/FormEdit';
import Table from './helpers/Table';

class Wallet extends React.Component {
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
};

Wallet.defaultProps = {
  edit: undefined,
};

const mapStateToProps = (state) => ({
  edit: state.wallet.edit });

export default connect(mapStateToProps, null)(Wallet);
