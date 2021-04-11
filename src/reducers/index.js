import { combineReducers } from 'redux';
import assetReducer from './assetReducer';
import chartReducer from './chartReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  asset: assetReducer,
  chart: chartReducer,
  modal: modalReducer,
});
