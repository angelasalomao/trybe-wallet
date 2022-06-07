// Coloque aqui suas actions

export const saveUser = 'saveUser';
export const user = (userEmail) => ({
  type: saveUser,
  userEmail,
});

const saveCurrencies = 'currencies';
export const getCurrencies = (currencies) => ({
  type: saveCurrencies,
  currencies,
});

const saveExpenses = 'expenses';
export const handleExpenses = (expenses) => ({
  type: saveExpenses,
  expenses,
});
