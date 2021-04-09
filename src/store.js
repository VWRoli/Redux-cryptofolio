import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {
  isLoading: false,
  isError: false,
  isModalOpen: false,

  coinInfo: [],
  totalValue: 0,
  totalValueChange: 0,
  chartData: [],
  activeCoin: '',
  displaySuccess: false,
  searchQuery: '',
  chartDays: '7',
  isEditAsset: false,
  defaultCurrency: 'usd',
};

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);
