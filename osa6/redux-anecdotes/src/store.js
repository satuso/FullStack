import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools()
)
anecdoteService.getAll().then(anecdote =>
  store.dispatch(initializeAnecdotes(anecdote))
)
export default store