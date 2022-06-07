// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const stateInicial = {
  currencies: [],
  expenses: [],
};

const reducerWallet = (state = stateInicial, action) => {
  switch (action.type) {
  case 'expenses':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case 'currencies':
    return {
      ...state,
      currencies: action.currencies,
    };
  default: {
    return state;
  }
  }
};

export default reducerWallet;
