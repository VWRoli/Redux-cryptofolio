import {
  GET_TOTALS,
  GET_TOTAL_CHANGE,
  SET_CHART_DATA,
  SET_DAYS,
} from '../constants/actionTypes';

const defaultState = {
  totalValue: 0,
  totalValueChange: 0,
  chartData: [],
  chartDays: '7',
};

const chartReducer = (state = defaultState, action) => {
  switch (action.type) {
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
      return { ...state, chartData: action.payload };

    case SET_DAYS:
      return { ...state, chartDays: action.payload };

    default:
      return state;
  }
};

export default chartReducer;
