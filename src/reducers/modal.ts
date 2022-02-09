import { ActionType } from '../constants/actionTypes';
import { IModalState, Action } from '../Types';

const defaultState: IModalState = {
  isModalOpen: false,
  activeCoin: '',
  displaySuccess: false,
  isEditAsset: false,
};

const modal = (
  state: IModalState = defaultState,
  action: Action
): IModalState => {
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
export default modal;
