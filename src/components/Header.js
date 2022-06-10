import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  getExpensesTotal = (expenses) => {
    const values = expenses.map(({ currency, exchangeRates, value }) => {
      const cotation = exchangeRates[currency].ask;
      return value * cotation;
    });
    const total = values.reduce((sum, value) => sum + value, 0);
    return total.toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header-wallet">
        <h1 className="title">Trybe Wallet</h1>
        <div className="info-wallet">
        <p data-testid="email-field" className="user-email"><b>Email: </b>{ email }</p>
        <p className="total-currency">
          <b>Despesa Total: </b>R$ { this.getExpensesTotal(expenses) } BRL
        </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
