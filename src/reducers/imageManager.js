const initialState = {
  images: [],

};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_IMAGES_SUCCESS':
      return {
        ...initialState,
        images: action.payload.data
      }
    default:
      return state
  }
}

export default auth