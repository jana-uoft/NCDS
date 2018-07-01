const events = (state = [], action) => {
  let events, eventIndex;
  switch (action.type) {
    case 'GET_EVENTS_SUCCESS':
      return [...action.payload.data]
    case 'UPDATE_EVENT_SUCCESS':
      eventIndex = state.findIndex(event=>event._id===action.payload.data._id)
      events = [...state]
      events.splice(eventIndex, 1, {...action.payload.data})
      return events
    case 'CREATE_EVENT_SUCCESS':
      return [{...action.payload.data}, ...state]
    case 'DELETE_EVENT_SUCCESS':
      eventIndex = state.findIndex(event=>event._id===action.payload.data._id)
      events = [...state]
      events.splice(eventIndex, 1)
      return events
    default:
      return state
  }
}

export default events