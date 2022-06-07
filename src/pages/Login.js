import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { user } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  inputValidation = () => {
    const minLengthPassword = 6;

    this.setState((prevState) => ({
      ...prevState,
      isDisabled: !(prevState.email.includes('@')
      && prevState.email.includes('.com')
      && prevState.password.length >= minLengthPassword),
    }));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({ ...prevState, [name]: value }), this.inputValidation);
  }

  formSubmit = (event) => {
    event.preventDefault();

    const { history, emailLogin } = this.props;
    const { email } = this.state;

    emailLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={ this.formSubmit }>
          <label htmlFor="email-input">
            Email
            <input
              type="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
              name="email"
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input
              type="password"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
              name="password"
            />
          </label>
          <button
            type="submit"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  emailLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailLogin: (state) => dispatch(user(state)),
});

export default connect(null, mapDispatchToProps)(Login);
