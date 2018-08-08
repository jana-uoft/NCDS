
export const getContributions = () => ({
  types: ['LOADING', 'GET_CONTRIBUTIONS_SUCCESS', 'GET_CONTRIBUTIONS_FAILED'],
  payload: {
    request:{
      url: '/contributions',
      method: 'GET'
    }
  }
})

export const updateContribution = contribution => {
  const id = contribution._id
  delete contribution['_id']
  delete contribution['__v']
  return {
    types: ['LOADING', 'UPDATE_CONTRIBUTION_SUCCESS', 'UPDATE_CONTRIBUTION_FAILED'],
    payload: {
      request:{
        url: `/contributions/${id}`,
        method: 'PUT',
        data: contribution
      }
    },
    success: 'Contribution updated successfully',
  }
}

export const createContribution = contribution => {
  return {
    types: ['LOADING', 'CREATE_CONTRIBUTION_SUCCESS', 'CREATE_CONTRIBUTION_FAILED'],
    payload: {
      request:{
        url: `/contributions`,
        method: 'POST',
        data: contribution
      }
    },
    success: 'Contribution created successfully',
  }
}

export const deleteContribution = contributionID => {
  return {
    types: ['LOADING', 'DELETE_CONTRIBUTION_SUCCESS', 'DELETE_CONTRIBUTION_FAILED'],
    payload: {
      request:{
        url: `/contributions/${contributionID}`,
        method: 'DELETE'
      }
    },
    success: 'Contribution deleted successfully',
  }
}