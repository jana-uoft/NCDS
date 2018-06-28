import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '/api',
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
    ],
    // response: [
    //   function ({getState, dispatch, getSourceAction}, req) {
    //     console.log(req); //contains information about request object
    //     //...
    //   },
    // ]
  }
};