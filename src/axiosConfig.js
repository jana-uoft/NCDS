import axios from 'axios';
console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL);

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
})

export const middlewareConfig = {
  interceptors: {
    request: [
      function ({getState, dispatch, getSourceAction}, req) {
        if (getState().auth.token)
          req.headers['Authorization'] = getState().auth.token
        return req
      }
    ]
  }
};