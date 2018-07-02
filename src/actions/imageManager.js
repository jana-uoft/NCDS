
export const getImages = () => ({
  types: ['LOADING', 'GET_IMAGES_SUCCESS', 'GET_IMAGES_FAILED'],
  payload: {
    request:{
      url: '/cloudinary',
      method: 'GET'
    }
  }
})

export const uploadImagesByTags = (images) => ({
  types: ['LOADING', 'UPLOAD_IMAGES_SUCCESS', 'UPLOAD_IMAGES_FAILED'],
  payload: {
    request:{
      url: '/cloudinary',
      method: 'POST',
      data: { images }
    }
  }
})

export const deleteImagesByTag = tag => ({
  types: ['LOADING', 'DELETE_IMAGES_SUCCESS', 'DELETE_IMAGES_FAILED'],
  payload: {
    request:{
      url: '/cloudinary/tag',
      method: 'DELETE',
      data: { tag }
    }
  }
})

export const deleteImagesByURLs = urls => ({
  types: ['LOADING', 'DELETE_IMAGES_SUCCESS', 'DELETE_IMAGES_FAILED'],
  payload: {
    request:{
      url: '/cloudinary/urls',
      method: 'DELETE',
      data: urls
    }
  }
})