import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage'
import general from './general';
import auth from './auth';
import events from './events';
import contributions from './contributions';
import imageManager from './imageManager';


const generalFilter = createBlacklistFilter('general', ['loading']);
const authFilter = createBlacklistFilter('auth', ['loginError']);
const persistConfig = {
  key: 'root',
  storage,
  transforms: [generalFilter, authFilter]
}

const rootReducer = combineReducers({
  general,
  auth,
  events,
  contributions,
  imageManager
})

export default persistReducer(persistConfig, rootReducer)
