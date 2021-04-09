import {
  CLEAR_ASSETS,
  REMOVE_ASSET,
  EDIT_ASSET,
  SET_CURRENCY,
  ADD_ASSET,
} from '../constants/actionTypes';

const defaultState = {
  assets: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CLEAR_ASSETS:
      return { ...state, assets: [] };

    case REMOVE_ASSET:
      return {
        ...state,
        assets: state.assets.filter((asset) => asset.id !== action.payload),
      };
    case ADD_ASSET:
      return { ...state, assets: [...state.assets, action.payload] };

    default:
      return state;
  }
};
