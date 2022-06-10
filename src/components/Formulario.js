import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import fetchCurrencies from '../services/requestApi';
import { getCurrencies, handleExpenses } from '../actions';
import './Formulario.css';

class Formulario extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    this.handleCurrencies();
  }

  handleCurrencies = async () => {
    const { saveCurrencies } = this.props;
    const currencies = await fetchCurrencies();
    const filterCurrencies = Object.keys(currencies)
      .filter((currency) => currency !== 'USDT');

    saveCurrencies(filterCurrencies);
  }

  submitForm = async (event) => {
    event.preventDefault();

    const { saveExpenses } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    
    const currencies = await fetchCurrencies();
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };

    saveExpenses(expense);

    this.setState((prevState) => ({
      ...prevState,
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    }));
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  handleValue = () => {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        {' '}
        <input
          value={ value }
          data-testid="value-input"
          type="text"
          onChange={ this.handleChange }
          name="value"
          id="value"
          placeholder="valor"
          className="input-value"
        />
      </label>
    );
  }

  handleDescription = () => {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        {' '}
        <input
          type="text"
          id="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
          name="description"
          placeholder="descrição"
          className="input-description"
        />
      </label>
    );
  }

  handleTag = () => {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Categoria:
        {' '}
        <select
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
          name="tag"
          className="select-form"
        >
          <option value="">Selecione</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { method, currency } = this.state;
    const { currencies } = this.props;
    return (
      <form className="form-sub" onSubmit={ this.submitForm }>
        { this.handleValue() }
        { this.handleDescription() }
        <label htmlFor="currency">
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
            name="currency"
            className="select-form"
          >
            {/* <option value=''>Selecione uma moeda</option> */}
            {currencies.map((currence, index) => (
              <option key={ index }>{ currence }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          {' '}
          <select
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
            name="method"
            className="select-form"
          >
            <option value="">Selecione</option>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        {this.handleTag()}
        <button
          type="submit"
          className="btn-add"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Formulario.propTypes = {
  saveCurrencies: PropTypes.func.isRequired,
  saveExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: (state) => dispatch(getCurrencies(state)),
  saveExpenses: (state) => dispatch(handleExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
