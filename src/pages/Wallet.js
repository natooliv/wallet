import React from 'react';

import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import Header from '../components/Header';

// aqui eu preciso fazer um render para poder renderizar o meu form e o botão de adicionar despesa e o botão de editar despesa
class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet">
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}
export default Wallet;
