const messages = (state = [], action) => {
  let messages, messageIndex;
  switch (action.type) {
    case 'GET_MESSAGES_SUCCESS':
      return [...action.payload.data]
    case 'DELETE_MESSAGE_SUCCESS':
      messageIndex = state.findIndex(message=>message._id===action.payload.data._id)
      messages = [...state]
      messages.splice(messageIndex, 1)
      return messages
    default:
      return state
  }
}

export default messages