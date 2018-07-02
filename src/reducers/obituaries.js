const obituaries = (state = [], action) => {
  let obituaries, obituaryIndex;
  switch (action.type) {
    case 'GET_OBITUARIES_SUCCESS':
      return [...action.payload.data]
    case 'UPDATE_OBITUARY_SUCCESS':
      obituaryIndex = state.findIndex(obituary=>obituary._id===action.payload.data._id)
      obituaries = [...state]
      obituaries.splice(obituaryIndex, 1, {...action.payload.data})
      return obituaries
    case 'CREATE_OBITUARY_SUCCESS':
      return [{...action.payload.data}, ...state]
    case 'DELETE_OBITUARY_SUCCESS':
      obituaryIndex = state.findIndex(obituary=>obituary._id===action.payload.data._id)
      obituaries = [...state]
      obituaries.splice(obituaryIndex, 1)
      return obituaries
    default:
      return state
  }
}

export default obituaries