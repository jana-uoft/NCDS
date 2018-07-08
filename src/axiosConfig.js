import axios from 'axios';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

export const client = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:5000/api' : 'http://localhost:5001/api',
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