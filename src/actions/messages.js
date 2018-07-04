
export const getMessages = () => ({
  types: ['LOADING', 'GET_MESSAGES_SUCCESS', 'GET_MESSAGES_FAILED'],
  payload: {
    request:{
      url: '/messages',
      method: 'GET'
    }
  }
})


export const deleteMessage = messageID => {
  return {
    types: ['LOADING', 'DELETE_MESSAGE_SUCCESS', 'DELETE_MESSAGE_FAILED'],
    payload: {
      request:{
        url: `/messages/${messageID}`,
        method: 'DELETE'
      }
    }
  }
}