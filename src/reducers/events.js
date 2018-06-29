const events = (state = [], action) => {
  switch (action.type) {
    case 'GET_EVENTS_SUCCESS':
      return [...action.payload.data]
    case 'UPDATE_EVENT_SUCCESS':
      const eventIndex = state.findIndex(event=>event._id===action.payload.data._id)
      let events = [...state]
      events.splice(eventIndex, 1, {...action.payload.data})
      return events
    default:
      return state
  }
}

export default events