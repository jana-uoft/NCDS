import { combineReducers } from 'redux';
import general from './general';
import auth from './auth';

export default combineReducers({
  general,
  auth
})