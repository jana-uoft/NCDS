import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
})

console.log('IN AXIOS CONFIG');

export const middlewareConfig = {
  interceptors: {
    request: [
      function ({getState, dispatch, getSourceAction}, req) {
        console.log('getState().auth.token', getState().auth.token);

        if (getState().auth.token) {
          req.headers['Authorization'] = getState().auth.token
          req.headers['CHECKING_IF_CAN_GET_TOKEN'] = 'YES CAN GET TOKEN'
        }
        req.headers['CHECKING_IF_CAN_ADD_HEDER'] = 'YES CAN ADD NEW HEADER'
        console.log('req.headers', req.headers);

        return req
      }
    ]
  }
};