// Esse reducer será responsável por tratar as informações da pessoa usuária
import { saveUser } from '../actions';

const stateInicial = {
  email: '',
};

const reducerUser = (state = stateInicial, action) => {
  switch (action.type) {
  case saveUser:
    return {
      email: action.userEmail,
    };
  default:
    return state;
  }
};

export default reducerUser;
