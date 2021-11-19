import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {

  switch (action.type) {
  case 'LIKE_BLOG':
    return state.map(blog =>
      blog.id === action.data.id
        ? { ...blog, likes: action.data.likes }
        : blog
    )
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

export const updateBlog = updatedBlog => {
  return async dispatch => {
    const blog = await blogService.update(updatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog
    })
  }
}

export const removeBlog = blogToRemove => {
  return async dispatch => {
    const removedBlog = await blogService.remove(blogToRemove)
    dispatch({
      type: 'REMOVE_BLOG',
      data: removedBlog
    })
  }
}
export default blogReducer