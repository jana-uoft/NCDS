
export const getGallerys = () => ({
  types: ['LOADING', 'GET_GALLERIES_SUCCESS', 'GET_GALLERIES_FAILED'],
  payload: {
    request:{
      url: '/galleries',
      method: 'GET'
    }
  }
})

export const updateGallery = gallery => {
  const id = gallery._id
  delete gallery['_id']
  delete gallery['__v']
  return {
    types: ['LOADING', 'UPDATE_GALLERY_SUCCESS', 'UPDATE_GALLERY_FAILED'],
    payload: {
      request:{
        url: `/galleries/${id}`,
        method: 'PUT',
        data: gallery
      }
    }
  }
}

export const createGallery = gallery => {
  return {
    types: ['LOADING', 'CREATE_GALLERY_SUCCESS', 'CREATE_GALLERY_FAILED'],
    payload: {
      request:{
        url: `/galleries`,
        method: 'POST',
        data: gallery
      }
    }
  }
}

export const deleteGallery = galleryID => {
  return {
    types: ['LOADING', 'DELETE_GALLERY_SUCCESS', 'DELETE_GALLERY_FAILED'],
    payload: {
      request:{
        url: `/galleries/${galleryID}`,
        method: 'DELETE'
      }
    }
  }
}