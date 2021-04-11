import {
  SET_ACTIVE_COIN,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_SUCCESS,
  OPEN_EDIT_ASSET,
} from '../constants/actionTypes';

const defaultState = {
  isModalOpen: false,
  activeCoin: '',
  displaySuccess: false,
  isEditAsset: false,
};

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ACTIVE_COIN:
      return { ...state, activeCoin: action.payload };
    case OPEN_MODAL:
      return { ...state, isModalOpen: true };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        isEditAsset: false,
        displaySuccess: false,
      };
    case OPEN_SUCCESS:
      return { ...state, displaySuccess: true };
    case OPEN_EDIT_ASSET:
      return { ...state, isEditAsset: true };
    default:
      return state;
  }
};
export default modalReducer;
