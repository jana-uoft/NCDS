
export const getEvents = () => ({
  types: ['LOADING', 'GET_EVENTS_SUCCESS', 'GET_EVENTS_FAILED'],
  payload: {
    request:{
      url: '/events',
      method: 'GET'
    }
  }
})

export const updateEvent = event => {
  const id = event._id
  delete event['_id']
  delete event['__v']
  return {
    types: ['LOADING', 'UPDATE_EVENT_SUCCESS', 'UPDATE_EVENT_FAILED'],
    payload: {
      request:{
        url: `/events/${id}`,
        method: 'PUT',
        data: event
      }
    }
  }
}

export const createEvent = event => {
  return {
    types: ['LOADING', 'CREATE_EVENT_SUCCESS', 'CREATE_EVENT_FAILED'],
    payload: {
      request:{
        url: `/events`,
        method: 'POST',
        data: event
      }
    }
  }
}

export const deleteEvent = eventID => {
  return {
    types: ['LOADING', 'DELETE_EVENT_SUCCESS', 'DELETE_EVENT_FAILED'],
    payload: {
      request:{
        url: `/events/${eventID}`,
        method: 'DELETE'
      }
    }
  }
}