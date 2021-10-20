import React, {useState} from 'react'
import blogService from '../services/blogs'

const CreateForm = ({
  setMessage,
  setErrorMessage,
  user,
  setUser,
  blogs,
  setBlogs,
  setCreateVisible
  }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
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
      setMessage(`added blog ${blog.title} ${blog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(blogs.concat(blog))
      setCreateVisible(false)
    } catch (exception) {
      setErrorMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <label>title:
        <input 
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        </label>
        <br />
        <label>author:
        <input 
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
        />
        </label>
        <br />
        <label>url: 
          <input 
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateForm