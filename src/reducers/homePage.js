const initialState = {
  advertisements: [],
  images: []
};

const homepage = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HOMEPAGE_SUCCESS':
    case 'UPDATE_HOMEPAGE_SUCCESS':
      return {...action.payload.data}
    default:
      return state
  }
}

export default homepage