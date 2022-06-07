import React from 'react';
import Formulario from '../components/Formulario';
import Header from '../components/Header';
import Tabela from '../components/Tabela';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Formulario />
        <Tabela />
      </div>
    );
  }
}

export default Wallet;
