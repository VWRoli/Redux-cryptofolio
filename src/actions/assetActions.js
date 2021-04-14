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
