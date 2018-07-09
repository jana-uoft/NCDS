
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
    },
    success: 'Message deleted successfully',
  }
}

export const sendMessage = message => ({
  types: ['LOADING', 'SEND_MESSAGE_SUCCESS', 'SEND_MESSAGE_FAILED'],
  payload: {
    request:{
      url: '/messages',
      method: 'POST',
      data: message
    },
    success: 'Email sent successfully',
  }
})