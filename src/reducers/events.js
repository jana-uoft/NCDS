const events = (state = [], action) => {
  switch (action.type) {
    case 'GET_EVENTS_SUCCESS':
      return [...action.payload.data]
    default:
      return state
  }
}

export default events