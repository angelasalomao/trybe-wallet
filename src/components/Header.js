import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <header>
        <h2 data-testid="email-field">{ email }</h2>
        <h3>Despesa Total</h3>
        <p data-testid="total-field">{ this.getExpensesTotal(expenses) }</p>
        <p data-testid="header-currency-field">BRL</p>
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
