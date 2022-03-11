import React from 'react';
import Header from './helpers/Header';
import Form from './helpers/Form';
import Table from './helpers/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <Table />
      </div>);
  }
}

export default Wallet;
