import { Dispatch } from 'redux';
import { ActionType } from '../constants/actionTypes';
import { Action } from '../Types';

export const closeModal =
  () =>
  (dispatch: Dispatch<Action>): void => {
    dispatch({ type: ActionType.CLOSE_MODAL });
  };

export const openSuccess =
  () =>
  (dispatch: Dispatch<Action>): void => {
    dispatch({ type: ActionType.OPEN_SUCCESS });
  };

export const openModal =
  () =>
  (dispatch: Dispatch<Action>): void => {
    dispatch({ type: ActionType.OPEN_MODAL });
  };

export const openEditAsset =
  (id: string) =>
  (dispatch: Dispatch<Action>): void => {
    dispatch({ type: ActionType.OPEN_EDIT_ASSET, payload: id });
  };
