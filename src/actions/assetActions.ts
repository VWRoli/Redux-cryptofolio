import { Dispatch } from 'redux';
import { ActionType } from '../constants/actionTypes';
import { chartDataFormatter, urlFormatter } from '../helpers';
import { State } from '../reducers';
import { Action, AssetType } from '../Types';

export const addAsset =
  (asset: AssetType) =>
  (dispatch: Dispatch<Action>, getState: () => State): void => {
    const prevAssets = getState().asset.assets;
    dispatch({ type: ActionType.ADD_ASSET, payload: asset });
    localStorage.setItem(
      'coinAssets',
      JSON.stringify({ assets: [...prevAssets, asset] }),
    );
  };

export const removeAsset =
  (id: string) =>
  (dispatch: Dispatch<Action>, getState: () => State): void => {
    const assets = getState().asset.assets.filter((asset) => asset.id !== id);

    assets.filter((asset: AssetType) => asset.id !== id);

    dispatch({ type: ActionType.REMOVE_ASSET, payload: assets });
    localStorage.setItem('coinAssets', JSON.stringify({ assets }));
  };

export const clearAssets =
  () =>
  (dispatch: Dispatch<Action>): void => {
    dispatch({ type: ActionType.CLEAR_ASSETS });
    localStorage.setItem('coinAssets', JSON.stringify({ assets: [] }));
  };

export const setSearchQuery =
  (query: string) =>
  (dispatch: Dispatch<Action>): void => {
    dispatch({ type: ActionType.SET_QUERY, payload: query });
  };

export const setActiveCoin =
  (id: string) =>
  (dispatch: Dispatch<Action>): void => {
    dispatch({ type: ActionType.SET_ACTIVE_COIN, payload: id });
  };

export const setCurrency =
  (currency: string) =>
  (dispatch: Dispatch<Action>): void => {
    dispatch({ type: ActionType.SET_CURRENCY, payload: currency });
  };

export const setChartDays =
  (day: number) =>
  (dispatch: Dispatch<Action>): void => {
    dispatch({ type: ActionType.SET_DAYS, payload: day });
  };

export const editAsset =
  (coin: AssetType, holdings: number | string) =>
  (dispatch: Dispatch<Action>, getState: () => State): void => {
    const { assets } = getState().asset;
    //Remove edited coin
    const strippedCoin = assets.filter((asset) => asset.id !== coin.id);
    //Edit coin and put it back into the array
    const editedCoin = { ...coin, holdings: +holdings };

    dispatch({
      type: ActionType.EDIT_ASSET,
      payload: [...strippedCoin, editedCoin],
    });
    localStorage.setItem(
      'coinAssets',
      JSON.stringify({ assets: [...strippedCoin, editedCoin] }),
    );
  };

export const fetchCoinData =
  () =>
  async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    try {
      const { assets, defaultCurrency, chartDays } = getState().asset;

      dispatch({ type: ActionType.LOADING });
      const formattedUrl = urlFormatter(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${defaultCurrency}&ids=`,
        assets,
      );

      const response = await fetch(`${formattedUrl}`);
      const coinInfo = await response.json();

      dispatch({ type: ActionType.DISPLAY_INFO, payload: coinInfo });

      //Get API urls for chart
      const chartUrls = assets.map(
        (item: AssetType) =>
          `https://api.coingecko.com/api/v3/coins/${item.id}/market_chart?vs_currency=${defaultCurrency}&days=${chartDays}`,
      );

      //Fetch chart data
      const chartRes: Response[] = await Promise.all(
        chartUrls.map((url: string) => fetch(url).catch((error) => error)),
      );

      const chartData: { [key: string]: number[][] }[] = await Promise.all(
        chartRes.map((response) =>
          response.json ? response.json().catch((error) => error) : response,
        ),
      );

      // Set chart data
      dispatch({
        type: ActionType.SET_CHART_DATA,
        payload: chartDataFormatter(chartData, assets),
      });

      //Get total asset values
      dispatch({ type: ActionType.GET_TOTALS });

      //Get total value change
      dispatch({ type: ActionType.GET_TOTAL_CHANGE });
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR });
    }
  };
