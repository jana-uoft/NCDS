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
    case (action.type.match(/_SUCCESS$/) || {}).input:
    case (action.type.match(/_FAILED$/) || {}).input:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default general