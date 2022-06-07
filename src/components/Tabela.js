import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Tabela extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const calcExpense = expense.exchangeRates[expense.currency];
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>
                  {Number(expense.value).toFixed(2)}
                </td>
                <td>{calcExpense.name}</td>
                <td>
                  {Number(calcExpense.ask).toFixed(2)}
                </td>
                <td>
                  {(Number(expense.value) * Number(calcExpense.ask)).toFixed(2)}
                </td>
                <td>Real</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Tabela.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.string,
    currency: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.string),
  })).isRequired,
};

export default connect(mapStateToProps, null)(Tabela);
