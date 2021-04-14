import {
  CLEAR_ASSETS,
  REMOVE_ASSET,
  EDIT_ASSET,
  SET_CURRENCY,
  ADD_ASSET,
  LOADING,
  DISPLAY_INFO,
  SET_ERROR,
  SET_QUERY,
  GET_TOTAL_CHANGE,
  GET_TOTALS,
  SET_CHART_DATA,
  SET_DAYS,
} from '../constants/actionTypes';

const defaultState = {
  isLoading: false,
  isError: false,
  assets: JSON.parse(localStorage.getItem('coinAssets')) || [],
  coinInfo: [],
  searchQuery: '',
  defaultCurrency: 'usd',
  totalValue: 0,
  totalValueChange: 0,
  chartData: [],
  chartDays: '7',
};

const assetReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CLEAR_ASSETS:
      return { ...state, assets: [] };

    case REMOVE_ASSET:
      return {
        ...state,
        assets: action.payload,
      };
    case ADD_ASSET:
      return { ...state, assets: [...state.assets, action.payload] };
    case LOADING:
      return { ...state, isLoading: true };
    case DISPLAY_INFO:
      return { ...state, coinInfo: action.payload };
    case SET_ERROR:
      return { ...state, isError: true, isLoading: false };
    case EDIT_ASSET:
      return { ...state, assets: action.payload };
    case SET_CURRENCY:
      return { ...state, defaultCurrency: action.payload };
    case SET_QUERY:
      return { ...state, searchQuery: action.payload };
    case GET_TOTALS:
      //Get the current value for the whole portfolio
      const currentAssetValue = state.assets
        .map((asset) => {
          const [correctCoin] = state.coinInfo.filter(
            (coin) => coin.id === asset.id
          );
          return asset.holdings * correctCoin.current_price;
        })
        .reduce((acc, cur) => acc + cur, 0);

      return { ...state, totalValue: currentAssetValue };

    case GET_TOTAL_CHANGE:
      //Get the 24h price change for the whole portfolio
      const assetValueChange = state.assets
        .map((asset, i) => {
          const [correctCoin] = state.coinInfo.filter(
            (coin) => coin.id === asset.id
          );

          return asset.holdings * correctCoin.price_change_24h;
        })
        .reduce((acc, cur) => acc + cur, 0);

      return { ...state, totalValueChange: assetValueChange, isLoading: false };

    case SET_CHART_DATA:
      return { ...state, chartData: action.payload, isLoading: false };

    case SET_DAYS:
      return { ...state, chartDays: action.payload };
    default:
      return state;
  }
};
export default assetReducer;
