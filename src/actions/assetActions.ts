import {
  ADD_ASSET,
  CLEAR_ASSETS,
  DISPLAY_INFO,
  EDIT_ASSET,
  GET_TOTALS,
  GET_TOTAL_CHANGE,
  LOADING,
  REMOVE_ASSET,
  SET_ACTIVE_COIN,
  SET_CHART_DATA,
  SET_CURRENCY,
  SET_DAYS,
  SET_ERROR,
  SET_QUERY,
} from '../constants/actionTypes';
import { chartDataFormatter, urlFormatter } from '../helpers';

export const addAsset = (asset) => (dispatch, getState) => {
  const prevAssets = getState().asset.assets;
  dispatch({ type: ADD_ASSET, payload: asset });
  localStorage.setItem('coinAssets', JSON.stringify([...prevAssets, asset]));
};

export const removeAsset = (id) => (dispatch, getState) => {
  const assets = getState().asset.assets.filter((asset) => asset.id !== id);
  dispatch({ type: REMOVE_ASSET, payload: assets });
  localStorage.setItem('coinAssets', JSON.stringify(assets));
};

export const clearAssets = () => (dispatch) => {
  dispatch({ type: CLEAR_ASSETS });
  localStorage.setItem('coinAssets', JSON.stringify([]));
};

export const setSearchQuery = (query) => (dispatch) => {
  dispatch({ type: SET_QUERY, payload: query });
};

export const setActiveCoin = (id) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_COIN, payload: id });
};

export const setCurrency = (currency) => (dispatch) => {
  dispatch({ type: SET_CURRENCY, payload: currency });
};

export const setChartDays = (day) => (dispatch) => {
  dispatch({ type: SET_DAYS, payload: day });
};

export const editAsset = (coin, holdings) => (dispatch, getState) => {
  //Remove editad coin
  const strippedCoin = getState().asset.assets.filter(
    (asset) => asset.id !== coin.id
  );
  //Edit coin and put it back into the array
  const editedCoin = { ...coin, holdings: +holdings };
  dispatch({ type: EDIT_ASSET, payload: [...strippedCoin, editedCoin] });
  localStorage.setItem(
    'coinAssets',
    JSON.stringify([...strippedCoin, editedCoin])
  );
};

export const fetchCoinData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING });
    const formattedUrl = urlFormatter(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
        getState().asset.defaultCurrency
      }&ids=`,
      getState().asset.assets
    );

    const response = await fetch(`${formattedUrl}`);
    const coinInfo = await response.json();

    dispatch({ type: DISPLAY_INFO, payload: coinInfo });

    //Get API urls for chart
    const chartUrls = getState().asset.assets.map(
      (item) =>
        `https://api.coingecko.com/api/v3/coins/${
          item.id
        }/market_chart?vs_currency=${getState().asset.defaultCurrency}&days=${
          getState().asset.chartDays
        }`
    );
    //Fetch chart data
    const chartRes = await Promise.all(
      chartUrls.map((url) => fetch(url).catch((error) => error))
    );
    const chartData = await Promise.all(
      chartRes.map((response) =>
        response.json ? response.json().catch((error) => error) : response
      )
    );

    // Set chart data
    dispatch({
      type: SET_CHART_DATA,
      payload: chartDataFormatter(chartData, getState().asset.assets),
    });

    //Get total asset values
    dispatch({ type: GET_TOTALS });

    //Get total value change
    dispatch({ type: GET_TOTAL_CHANGE });
  } catch (error) {
    dispatch({ type: SET_ERROR });
  }
};
