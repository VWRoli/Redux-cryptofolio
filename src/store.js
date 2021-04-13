import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import asyncMiddleware from './middleware';

const defaultState = {};

const middleware = [thunk, asyncMiddleware];

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) || compose;

export const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(compose(applyMiddleware(...middleware)))
);
