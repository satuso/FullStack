import React, { useState } from 'react'

const CreateForm = ({ setViewToggle, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogForm = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    setViewToggle(false)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogForm}>
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