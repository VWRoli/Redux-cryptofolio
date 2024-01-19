import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

const persistedState = localStorage.getItem('cryptofolio')
  ? JSON.parse(localStorage.getItem('cryptofolio') || '{}')
  : {};

if (persistedState?.asset?.isError) {
  persistedState.asset.isError = false;
}

export const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(...middleware)),
);

store.subscribe(() => {
  localStorage.setItem('cryptofolio', JSON.stringify(store.getState()));
});
