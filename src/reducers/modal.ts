import { Action } from '../actions/Types';
import { ActionType } from '../constants/actionTypes';

export type ModalStateType = {
  isModalOpen: boolean;
  activeCoin: string;
  displaySuccess: boolean;
  isEditAsset: boolean;
};

const defaultState: ModalStateType = {
  isModalOpen: false,
  activeCoin: '',
  displaySuccess: false,
  isEditAsset: false,
};

const modalReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_COIN:
      return { ...state, activeCoin: action.payload };
    case ActionType.OPEN_MODAL:
      return { ...state, isModalOpen: true };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        isEditAsset: false,
        displaySuccess: false,
      };
    case ActionType.OPEN_SUCCESS:
      return { ...state, displaySuccess: true };
    case ActionType.OPEN_EDIT_ASSET:
      return { ...state, isEditAsset: true };
    default:
      return state;
  }
};
export default modalReducer;
