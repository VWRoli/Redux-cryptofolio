import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const defaultState = {};

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(...middleware)
);