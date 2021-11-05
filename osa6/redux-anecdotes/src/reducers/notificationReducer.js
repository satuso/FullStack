const initialState = "notification msg"

export const notificationReducer = (state = initialState, action) => {
  console.log('action: ', action)
  console.log('state: ', state)
  switch (action.type){
    case "NOTIFICATION":
      return {...state, content: action.content}
    case "CLEAR NOTIFICATION":
      return initialState
      default: return state
  }
}

export default notificationReducer