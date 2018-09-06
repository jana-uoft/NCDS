
export const getHome = () => ({
  types: ['LOADING', 'GET_HOMEPAGE_SUCCESS', 'GET_HOMEPAGE_FAILED'],
  payload: {
    request:{
      url: '/home',
      method: 'GET'
    }
  }
})

export const updateHome = home => {
  delete home['_id']
  delete home['__v']
  return {
    types: ['LOADING', 'UPDATE_HOMEPAGE_SUCCESS', 'UPDATE_HOMEPAGE_FAILED'],
    payload: {
      request:{
        url: `/home`,
        method: 'PUT',
        data: home
      }
    },
    success: 'Homepage updated successfully',
  }
}
