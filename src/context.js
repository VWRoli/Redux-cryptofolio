import React, { useContext, useReducer, useEffect, useCallback } from 'react';

import reducer from './reducer';

import {
  CLEAR_ASSETS,
  REMOVE_ASSET,
  LOADING,
  DISPLAY_INFO,
  GET_TOTALS,
  GET_TOTAL_CHANGE,
  SET_CHART_DATA,
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

import { urlFormatter, chartDataFormatter } from './helpers';

const AppContext = React.createContext();

const initialState = {
  isLoading: false,
  isError: false,
  isModalOpen: false,
  assets: [],
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

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Get LocalStorage
  useEffect(() => {
    const coinData = localStorage.getItem('coinData');
    const savedCoinData = JSON.parse(coinData);
    savedCoinData ? (state.assets = savedCoinData) : (state.assets = []);
  }, []);

  const clearAssets = () => {
    dispatch({ type: CLEAR_ASSETS });
  };

  const removeAsset = (id) => {
    dispatch({ type: REMOVE_ASSET, payload: id });
  };

  //Open and close modal
  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  //Set active coin
  const setActiveCoin = (id) => {
    dispatch({ type: SET_ACTIVE_COIN, payload: id });
  };
  //Add asset
  const addAsset = (asset) => {
    dispatch({ type: ADD_ASSET, payload: asset });
  };

  //Edit asset
  const editAsset = () => {
    dispatch({ type: EDIT_ASSET });
  };

  //Set success message after adding asset
  const openSuccess = () => {
    dispatch({ type: OPEN_SUCCESS });
  };

  //Search Query
  const setSearchQuery = (query) => {
    dispatch({ type: SET_QUERY, payload: query });
  };

  //Error handling
  const setIsError = () => {
    dispatch({ type: SET_ERROR });
  };

  //Set chart data days
  const setChartDays = (day) => {
    dispatch({ type: SET_DAYS, payload: day });
  };

  //Display edit asset
  const openEditAsset = (id) => {
    dispatch({ type: OPEN_EDIT_ASSET, payload: id });
  };

  //Set default currency
  const setCurrency = (currency) => {
    dispatch({ type: SET_CURRENCY, payload: currency });
  };

  //Price formatter
  const priceFormatter = (price) => {
    //Locale
    const locale = navigator.language;
    const formattedPrice = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: `${state.defaultCurrency}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
    return formattedPrice;
  };

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

  //Set LocalStorage
  useEffect(() => {
    const coinData = JSON.stringify(state.assets);
    localStorage.setItem('coinData', coinData);
  }, [state.assets]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearAssets,
        removeAsset,
        openModal,
        closeModal,
        setActiveCoin,
        addAsset,
        openSuccess,
        setSearchQuery,
        setIsError,
        fetchCoinInfo,
        setChartDays,
        openEditAsset,
        editAsset,
        setCurrency,
        priceFormatter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
