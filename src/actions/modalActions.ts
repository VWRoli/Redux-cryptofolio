import {
  CLOSE_MODAL,
  OPEN_EDIT_ASSET,
  OPEN_MODAL,
  OPEN_SUCCESS,
} from '../constants/actionTypes';

export const closeModal = () => (dispatch) => {
  dispatch({ type: CLOSE_MODAL });
};

export const openSuccess = () => (dispatch) => {
  dispatch({ type: OPEN_SUCCESS });
};

export const openModal = () => (dispatch) => {
  dispatch({ type: OPEN_MODAL });
};

export const openEditAsset = (id) => (dispatch) => {
  dispatch({ type: OPEN_EDIT_ASSET, payload: id });
};
