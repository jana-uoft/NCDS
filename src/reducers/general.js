const general = (state = {activePage: ""}, action) => {
  switch (action.type) {
    case 'GO_TO_PAGE':
      return {
        ...state,
        activePage: action.activePage,
      }
    default:
      return state
  }
}

export default general