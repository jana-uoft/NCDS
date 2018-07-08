import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
})

export const middlewareConfig = {
  interceptors: {
    request: [
      function ({getState, dispatch, getSourceAction}, req) {
        if (getState().auth.token) {
          req.headers['Authorization'] = getState().auth.token
          req.headers['CHECKING_IF_CAN_GET_TOKEN'] = 'YES CAN GET TOKEN'
        }
        req.headers['CHECKING_IF_CAN_ADD_HEDER'] = 'YES CAN ADD NEW HEADER'
        return req
      }
    ]
  }
};