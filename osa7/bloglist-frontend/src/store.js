import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer, { initializeBlogs } from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import blogService from './services/blogs'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

blogService.getAll().then(blog =>
  store.dispatch(initializeBlogs(blog))
)

export default store