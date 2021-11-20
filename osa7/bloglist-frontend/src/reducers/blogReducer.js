import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE_BLOG':
    // eslint-disable-next-line no-case-declarations
    const id = action.data.id
    return state.map(blog => blog.id !== id ? blog : action.data.data)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'CREATE_BLOG',
      data: blog
    })
  }
}

export const updateBlog = blog => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  return async dispatch => {
    const newBlog = await blogService.update(blog.id, updatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const removedBlog = await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: removedBlog
    })
  }
}

export default blogReducer