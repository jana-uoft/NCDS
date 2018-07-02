const galleries = (state = [], action) => {
  let galleries, galleryIndex;
  switch (action.type) {
    case 'GET_GALLERIES_SUCCESS':
      return [...action.payload.data]
    case 'UPDATE_GALLERY_SUCCESS':
      galleryIndex = state.findIndex(gallery=>gallery._id===action.payload.data._id)
      galleries = [...state]
      galleries.splice(galleryIndex, 1, {...action.payload.data})
      return galleries
    case 'CREATE_GALLERY_SUCCESS':
      return [{...action.payload.data}, ...state]
    case 'DELETE_GALLERY_SUCCESS':
      galleryIndex = state.findIndex(gallery=>gallery._id===action.payload.data._id)
      galleries = [...state]
      galleries.splice(galleryIndex, 1)
      return galleries
    default:
      return state
  }
}

export default galleries