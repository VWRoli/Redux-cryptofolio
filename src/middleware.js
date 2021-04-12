import { useEffect, useCallback } from 'react';
import {
  DISPLAY_INFO,
  GET_TOTALS,
  GET_TOTAL_CHANGE,
  LOADING,
  SET_CHART_DATA,
} from './constants/actionTypes';

//Get Coin Info
const fetchCoinInfo = useCallback(async () => {
  try {
    dispatch({ type: LOADING });
    const formattedUrl = urlFormatter(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${state.defaultCurrency}&ids=`,
      state.assets
    );

    const response = await fetch(`${formattedUrl}`);
    const coinInfo = await response.json();

    dispatch({ type: DISPLAY_INFO, payload: coinInfo });

    //Get API urls for chart
    const chartUrls = state.assets.map(
      (item) =>
        `https://api.coingecko.com/api/v3/coins/${item.id}/market_chart?vs_currency=${state.defaultCurrency}&days=${state.chartDays}`
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
      payload: chartDataFormatter(chartData, state.assets),
    });

    //Get total asset values
    dispatch({ type: GET_TOTALS });

    //Get total value change
    dispatch({ type: GET_TOTAL_CHANGE });
  } catch (error) {
    setIsError();
  }
}, [state.assets, state.chartDays, state.defaultCurrency]);

useEffect(() => {
  fetchCoinInfo();
}, [state.assets, fetchCoinInfo, state.chartDays, state.defaultCurrency]);
