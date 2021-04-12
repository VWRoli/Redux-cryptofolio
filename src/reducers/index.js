import { combineReducers } from 'redux';
import assetReducer from './assetReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  asset: assetReducer,
  modal: modalReducer,
});
