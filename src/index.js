import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import { client, middlewareConfig } from './axiosConfig';
import axiosMiddleware from 'redux-axios-middleware';
import { PersistGate } from 'redux-persist/integration/react'
import persistedReducer from './reducers'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Loading from './components/global/Loading';


// Configure Store
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
