import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import theReducer from '../reducers';

const store = createStore(
  theReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
