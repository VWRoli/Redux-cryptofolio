import { combineReducers } from 'redux';
import assetReducer from './asset';
import modalReducer from './modal';

const reducers = combineReducers({
  asset: assetReducer,
  modal: modalReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
