import { combineReducers } from 'redux';
import assetReducer from './asset';
import modalReducer from './modal';

export default combineReducers({
  asset: assetReducer,
  modal: modalReducer,
});
