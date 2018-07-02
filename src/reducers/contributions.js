const contributions = (state = [], action) => {
  let contributions, contributionIndex;
  switch (action.type) {
    case 'GET_CONTRIBUTIONS_SUCCESS':
      return [...action.payload.data]
    case 'UPDATE_CONTRIBUTION_SUCCESS':
      contributionIndex = state.findIndex(contribution=>contribution._id===action.payload.data._id)
      contributions = [...state]
      contributions.splice(contributionIndex, 1, {...action.payload.data})
      return contributions
    case 'CREATE_CONTRIBUTION_SUCCESS':
      return [{...action.payload.data}, ...state]
    case 'DELETE_CONTRIBUTION_SUCCESS':
      contributionIndex = state.findIndex(contribution=>contribution._id===action.payload.data._id)
      contributions = [...state]
      contributions.splice(contributionIndex, 1)
      return contributions
    default:
      return state
  }
}

export default contributions