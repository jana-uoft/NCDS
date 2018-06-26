const initialState = {
  activePage: "",
  loading: false
};

const general = (state = initialState, action) => {
  switch (action.type) {
    case 'GO_TO_PAGE':
      return {
        ...state,
        activePage: action.activePage,
      }
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