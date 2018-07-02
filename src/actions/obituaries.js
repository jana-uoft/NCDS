
export const getObituaries = () => ({
  types: ['LOADING', 'GET_OBITUARIES_SUCCESS', 'GET_OBITUARIES_FAILED'],
  payload: {
    request:{
      url: '/obituaries',
      method: 'GET'
    }
  }
})

export const updateObituary = obituary => {
  const id = obituary._id
  delete obituary['_id']
  delete obituary['__v']
  return {
    types: ['LOADING', 'UPDATE_OBITUARY_SUCCESS', 'UPDATE_OBITUARY_FAILED'],
    payload: {
      request:{
        url: `/obituaries/${id}`,
        method: 'PUT',
        data: obituary
      }
    }
  }
}

export const createObituary = obituary => {
  return {
    types: ['LOADING', 'CREATE_OBITUARY_SUCCESS', 'CREATE_OBITUARY_FAILED'],
    payload: {
      request:{
        url: `/obituaries`,
        method: 'POST',
        data: obituary
      }
    }
  }
}

export const deleteObituary = obituaryID => {
  return {
    types: ['LOADING', 'DELETE_OBITUARY_SUCCESS', 'DELETE_OBITUARY_FAILED'],
    payload: {
      request:{
        url: `/obituaries/${obituaryID}`,
        method: 'DELETE'
      }
    }
  }
}