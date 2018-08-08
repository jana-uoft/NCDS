const initialState = {
};

const auth = (state = {}, action) => {
  switch (action.type) {
    case 'GET_IMAGES_SUCCESS':
      return {
        ...initialState,
        ...action.payload.data
      }
    default:
      return state
  }
}

export default auth