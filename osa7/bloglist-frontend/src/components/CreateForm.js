import React, { useState } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const CreateForm = ({
  user,
  setUser,
  blogs,
  setBlogs,
  setCreateVisible
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const createNew = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title, author, url
      })
      setUser(user)
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(setNotification(`added blog ${blog.title} ${blog.author}`, 10))
      setBlogs(blogs.concat(blog))
      setCreateVisible(false)
    } catch (exception) {
      dispatch(setNotification('error', 10))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <label>title:
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br />
        <label>author:
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br />
        <label>url:
          <input
            type="text"
            id="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />
        <button id="create" type="submit">save</button>
      </form>
    </div>
  )
}

export default CreateForm