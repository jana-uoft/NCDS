const initialState = {
  loading: false,
  notification: false,
  notificationType: 'success'
};

const general = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: false,
        notificationType: 'success'
      }
    case (action.type.match(/_SUCCESS$/) || {}).input:
      return {
        ...state,
        loading: false,
        notification: action.meta.previousAction.success,
        notificationType: 'success'
      }
    case (action.type.match(/_FAILED$/) || {}).input:
      console.log(action.error.response.data);
      return {
        ...state,
        loading: false,
        notification: "Oops. Something went wrong! Error logged to console.",
        notificationType: 'error'
      }
    default:
      return state
  }
}

export default general