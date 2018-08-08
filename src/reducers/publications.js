const publications = (state = [], action) => {
  let publications, publicationIndex;
  switch (action.type) {
    case 'GET_PUBLICATIONS_SUCCESS':
      return [...action.payload.data]
    case 'UPDATE_PUBLICATION_SUCCESS':
      publicationIndex = state.findIndex(publication=>publication._id===action.payload.data._id)
      publications = [...state]
      publications.splice(publicationIndex, 1, {...action.payload.data})
      return publications
    case 'CREATE_PUBLICATION_SUCCESS':
      return [{...action.payload.data}, ...state]
    case 'DELETE_PUBLICATION_SUCCESS':
      publicationIndex = state.findIndex(publication=>publication._id===action.payload.data._id)
      publications = [...state]
      publications.splice(publicationIndex, 1)
      return publications
    default:
      return state
  }
}

export default publications