import { combineReducers } from 'redux';
import general from './general';
import auth from './auth';
import events from './events';
import { persistReducer } from 'redux-persist'
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  general,
  auth,
  events
})


const generalFilter = createBlacklistFilter('general', ['loading']);
const authFilter = createBlacklistFilter('auth', ['loginError']);
const persistConfig = {
  key: 'root',
  storage,
  transforms: [generalFilter, authFilter]
}

export default persistReducer(persistConfig, rootReducer)
