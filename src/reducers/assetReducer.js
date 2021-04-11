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
} from '../constants/actionTypes';

const defaultState = {
  isLoading: false,
  isError: false,
  assets: [{ id: 'bitcoin', amount: 1 }],
  coinInfo: [],
  searchQuery: '',
  defaultCurrency: 'usd',
};

const assetReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CLEAR_ASSETS:
      return { ...state, assets: [] };

    case REMOVE_ASSET:
      return {
        ...state,
        assets: state.assets.filter((asset) => asset.id !== action.payload),
      };
    case ADD_ASSET:
      return { ...state, assets: [...state.assets, action.payload] };
    case LOADING:
      return { ...state, isLoading: true };
    case DISPLAY_INFO:
      return { ...state, coinInfo: action.payload };
    case SET_ERROR:
      return { ...state, isError: true };
    case EDIT_ASSET:
      return { ...state, assets: [...state.assets] };
    case SET_CURRENCY:
      return { ...state, defaultCurrency: action.payload };
    case SET_QUERY:
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};
export default assetReducer;
