import { combineReducers } from 'redux';
import * as actionTypes from './actions';

export function feedData(state = {}, action) {
  switch (action.type) {
 case actionTypes.SET_FEED_DATA:
    return action.data;
  default:
    return state;
  }
}

function isPaginationDisabled(state = false, action) {
  switch (action.type) {
  case actionTypes.SET_IS_PAGINTAIONDISABLED:
    return action.isPaginationDisabled;
  default:
    return state;
  }
}

export default combineReducers({
  feedData,
  isPaginationDisabled
});
