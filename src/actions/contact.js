
export const getContact = () => ({
  types: ['LOADING', 'GET_CONTACTS_SUCCESS', 'GET_CONTACTS_FAILED'],
  payload: {
    request:{
      url: '/contact',
      method: 'GET'
    }
  }
})

export const updateContact = contact => {
  delete contact['_id']
  delete contact['__v']
  return {
    types: ['LOADING', 'UPDATE_CONTACTS_SUCCESS', 'UPDATE_CONTACTS_FAILED'],
    payload: {
      request:{
        url: `/contact`,
        method: 'PUT',
        data: contact
      }
    },
    success: 'Contacts updated successfully',
  }
}
