
export const getPublications = () => ({
  types: ['LOADING', 'GET_PUBLICATIONS_SUCCESS', 'GET_PUBLICATIONS_FAILED'],
  payload: {
    request:{
      url: '/publications',
      method: 'GET'
    }
  }
})

export const updatePublication = publication => {
  const id = publication._id
  delete publication['_id']
  delete publication['__v']
  return {
    types: ['LOADING', 'UPDATE_PUBLICATION_SUCCESS', 'UPDATE_PUBLICATION_FAILED'],
    payload: {
      request:{
        url: `/publications/${id}`,
        method: 'PUT',
        data: publication
      }
    },
    success: 'Publication updated successfully',
  }
}

export const createPublication = publication => {
  return {
    types: ['LOADING', 'CREATE_PUBLICATION_SUCCESS', 'CREATE_PUBLICATION_FAILED'],
    payload: {
      request:{
        url: `/publications`,
        method: 'POST',
        data: publication
      }
    },
    success: 'Publication created successfully',
  }
}

export const deletePublication = publicationID => {
  return {
    types: ['LOADING', 'DELETE_PUBLICATION_SUCCESS', 'DELETE_PUBLICATION_FAILED'],
    payload: {
      request:{
        url: `/publications/${publicationID}`,
        method: 'DELETE'
      }
    },
    success: 'Publication deleted successfully',
  }
}