import { combineReducers } from 'redux';
import asset from './asset';
import modal from './modal';

const reducers = combineReducers({
  modal,
  asset,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
