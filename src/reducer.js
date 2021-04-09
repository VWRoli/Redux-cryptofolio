import {
  CLEAR_ASSETS,
  DISPLAY_INFO,
  SET_CHART_DATA,
  GET_TOTALS,
  GET_TOTAL_CHANGE,
  LOADING,
  REMOVE_ASSET,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_ACTIVE_COIN,
  ADD_ASSET,
  OPEN_SUCCESS,
  SET_QUERY,
  SET_ERROR,
  SET_DAYS,
  OPEN_EDIT_ASSET,
  EDIT_ASSET,
  SET_CURRENCY,
} from './constant';

const reducer = (state, action) => {
  if (action.type === CLEAR_ASSETS) {
    return { ...state, assets: [] };
  }
  if (action.type === REMOVE_ASSET) {
    return {
      ...state,
      assets: state.assets.filter((asset) => asset.id !== action.payload),
    };
  }
  if (action.type === LOADING) {
    return { ...state, isLoading: true };
  }
  if (action.type === DISPLAY_INFO) {
    return { ...state, coinInfo: action.payload };
  }

  if (action.type === GET_TOTALS) {
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
  }

  if (action.type === GET_TOTAL_CHANGE) {
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
  }

  if (action.type === SET_CHART_DATA) {
    return { ...state, chartData: action.payload };
  }
  if (action.type === OPEN_MODAL) {
    return { ...state, isModalOpen: true };
  }
  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      isModalOpen: false,
      isEditAsset: false,
      displaySuccess: false,
    };
  }
  if (action.type === SET_ACTIVE_COIN) {
    return { ...state, activeCoin: action.payload };
  }
  if (action.type === ADD_ASSET) {
    return { ...state, assets: [...state.assets, action.payload] };
  }
  if (action.type === OPEN_SUCCESS) {
    return { ...state, displaySuccess: true };
  }
  if (action.type === SET_QUERY) {
    return { ...state, searchQuery: action.payload };
  }
  if (action.type === SET_ERROR) {
    return { ...state, isError: true };
  }
  if (action.type === SET_DAYS) {
    return { ...state, chartDays: action.payload };
  }
  if (action.type === OPEN_EDIT_ASSET) {
    return { ...state, isEditAsset: true };
  }
  if (action.type === EDIT_ASSET) {
    return { ...state, assets: [...state.assets] };
  }
  if (action.type === SET_CURRENCY) {
    return { ...state, defaultCurrency: action.payload };
  }
  return state;
};
export default reducer;
