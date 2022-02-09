import { Dispatch } from 'redux';
import { ActionType } from '../constants/actionTypes';
import { chartDataFormatter, urlFormatter } from '../helpers';
import { Action } from '../Types';

export type AssetType = {
  id: string;
  holdings: number;
};
//todo getstate: any
export const addAsset =
  (asset: AssetType) => (dispatch: Dispatch<Action>, getState: any) => {
    const prevAssets = getState().asset.assets;
    dispatch({ type: ActionType.ADD_ASSET, payload: asset });
    localStorage.setItem('coinAssets', JSON.stringify([...prevAssets, asset]));
  };

export const removeAsset =
  (id: string) => (dispatch: Dispatch<Action>, getState: any) => {
    const assets = getState().asset.assets.filter(
      (asset: AssetType) => asset.id !== id
    );
    dispatch({ type: ActionType.REMOVE_ASSET, payload: assets });
    localStorage.setItem('coinAssets', JSON.stringify(assets));
  };

export const clearAssets = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.CLEAR_ASSETS });
  localStorage.setItem('coinAssets', JSON.stringify([]));
};

export const setSearchQuery =
  (query: string) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_QUERY, payload: query });
  };

export const setActiveCoin = (id: string) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.SET_ACTIVE_COIN, payload: id });
};

export const setCurrency =
  (currency: string) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_CURRENCY, payload: currency });
  };

export const setChartDays = (day: number) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.SET_DAYS, payload: day });
};

export const editAsset =
  (coin: AssetType, holdings: number) =>
  (dispatch: Dispatch<Action>, getState: any) => {
    //Remove edited coin
    const strippedCoin = getState().asset.assets.filter(
      (asset: AssetType) => asset.id !== coin.id
    );
    //Edit coin and put it back into the array
    const editedCoin = { ...coin, holdings: +holdings };
    dispatch({
      type: ActionType.EDIT_ASSET,
      payload: [...strippedCoin, editedCoin],
    });
    localStorage.setItem(
      'coinAssets',
      JSON.stringify([...strippedCoin, editedCoin])
    );
  };

export const fetchCoinData =
  () => async (dispatch: Dispatch<Action>, getState: any) => {
    try {
      dispatch({ type: ActionType.LOADING });
      const formattedUrl = urlFormatter(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
          getState().asset.defaultCurrency
        }&ids=`,
        getState().asset.assets
      );

      const response = await fetch(`${formattedUrl}`);
      const coinInfo = await response.json();

      dispatch({ type: ActionType.DISPLAY_INFO, payload: coinInfo });

      //Get API urls for chart
      const chartUrls = getState().asset.assets.map(
        (item: AssetType) =>
          `https://api.coingecko.com/api/v3/coins/${
            item.id
          }/market_chart?vs_currency=${getState().asset.defaultCurrency}&days=${
            getState().asset.chartDays
          }`
      );
      //Fetch chart data
      const chartRes = await Promise.all(
        //todo
        chartUrls.map((url: string) => fetch(url).catch((error) => error))
      );
      const chartData = await Promise.all(
        //todo
        chartRes.map((response) =>
          response.json ? response.json().catch((error: {}) => error) : response
        )
      );

      // Set chart data
      dispatch({
        type: ActionType.SET_CHART_DATA,
        //todo
        payload: chartDataFormatter(chartData, getState().asset.assets),
      });

      //Get total asset values
      dispatch({ type: ActionType.GET_TOTALS });

      //Get total value change
      dispatch({ type: ActionType.GET_TOTAL_CHANGE });
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR });
    }
  };
