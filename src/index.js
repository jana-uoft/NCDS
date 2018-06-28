import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import rootReducer from './reducers'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Loading from './components/global/Loading';

const generalFilter = createBlacklistFilter('general', ['loading']);
const authFilter = createBlacklistFilter('auth', ['loginError']);
const persistConfig = {
  key: 'root',
  storage,
  transforms: [generalFilter, authFilter]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '/api',
  responseType: 'json'
})

const middlewareConfig = {
  interceptors: {
    request: [
      function ({getState, dispatch, getSourceAction}, req) {
        if (getState().auth.token)
          req.headers['Authorization'] = 'Bearer ' + getState().auth.token
        return req
      }
    ],
    // response: [
    //   function ({getState, dispatch, getSourceAction}, req) {
    //     console.log(req); //contains information about request object
    //     //...
    //   },
    // ]
  }
};


let storeEnhancers;
if (process.env.NODE_ENV === 'development') {
  storeEnhancers = compose(
    applyMiddleware(
      axiosMiddleware(client, middlewareConfig),
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
} else {
  storeEnhancers = compose(
    applyMiddleware(
      axiosMiddleware(client),
    ),
  )
}


const store = createStore(persistedReducer, storeEnhancers)
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker()
