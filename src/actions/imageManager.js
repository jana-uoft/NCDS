
export const getImages = () => ({
  types: ['LOADING', 'GET_IMAGES_SUCCESS', 'GET_IMAGES_FAILED'],
  payload: {
    request:{
      url: '/cloudinary',
      method: 'GET'
    }
  }
})
