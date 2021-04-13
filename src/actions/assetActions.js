import {
  ADD_ASSET,
  CLEAR_ASSETS,
  EDIT_ASSET,
  REMOVE_ASSET,
  SET_ACTIVE_COIN,
  SET_CURRENCY,
  SET_DAYS,
  SET_QUERY,
} from '../constants/actionTypes';

export const addAsset = (asset) => (dispatch) => {
  dispatch({ type: ADD_ASSET, payload: asset });
};

export const removeAsset = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ASSET, payload: id });
};

export const clearAssets = () => (dispatch) => {
  dispatch({ type: CLEAR_ASSETS });
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

export const editAsset = () => (dispatch) => {
  dispatch({ type: EDIT_ASSET });
};
