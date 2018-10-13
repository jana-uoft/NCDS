const initialState = {
  members: "",
  contacts: ""
};

const contact = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTACTS_SUCCESS':
    case 'UPDATE_CONTACTS_SUCCESS':
      return {...action.payload.data}
    default:
      return state
  }
}

export default contact