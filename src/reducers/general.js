const initialState = {
  loading: false
};

const general = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'LOGIN_SUCCESS':
    case 'LOGIN_FAILED':
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default general