
export const getEvents = () => ({
  types: ['LOADING', 'GET_EVENTS_SUCCESS', 'GET_EVENTS_FAILED'],
  payload: {
    request:{
      url: '/events',
      method: 'GET'
    }
  }
})