const initialState = { msg: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.msg
    case "CLEAR_NOTIFICATION":
      return initialState
    default:
      return state
  }
}

export const setNotification = (msg) => {
  return {
    type: "SET_NOTIFICATION",
    data: { msg },
  }
}

export const clearNotification = (msg) => {
  return {
    type: "CLEAR_NOTIFICATION",
  }
}

export default notificationReducer