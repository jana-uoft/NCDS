
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
    types: ['NO_LOADING', 'UPDATE_EVENT_SUCCESS', 'UPDATE_EVENT_FAILED'],
    payload: {
      request:{
        url: `/events/${id}`,
        method: 'PUT',
        data: event
      }
    }
  }
}
