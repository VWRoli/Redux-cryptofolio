import { ActionType } from '../constants/actionTypes';
import { IModalState, Action, ModalType } from '../Types';

const defaultState: IModalState = {
  isModalOpen: false,
  activeCoin: '',
  modal: undefined,
};

const modal = (
  state: IModalState = defaultState,
  action: Action,
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
        modal: undefined,
      };
    case ActionType.OPEN_SUCCESS:
      return { ...state, modal: ModalType.SUCCESS };
    case ActionType.OPEN_EDIT_ASSET:
      return { ...state, modal: ModalType.EDIT };
    default:
      return state;
  }
};
export default modal;
