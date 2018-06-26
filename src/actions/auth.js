export const login = ({email, password}) => ({
  types: ['LOADING', 'LOGIN_SUCCESS', 'LOGIN_FAILED'],
  payload: {
    request:{
      url: '/auth/login',
      method: 'POST',
      data: {email, password}
    }
  }
})
