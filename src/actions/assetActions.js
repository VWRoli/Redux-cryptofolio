import {
  CLEAR_ASSETS,
  REMOVE_ASSET,
  EDIT_ASSET,
  SET_CURRENCY,
} from '../constants/actionTypes';

export const clearAssets = () => (dispatch) => {
  dispatch({ type: CLEAR_ASSETS });
};

export const removeAsset = (id) => {
  dispatch({ type: REMOVE_ASSET, payload: id });
};

export const addAsset = (asset) => {
  dispatch({ type: ADD_ASSET, payload: asset });
};
