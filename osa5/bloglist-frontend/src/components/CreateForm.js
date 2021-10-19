import React from 'react'

const CreateForm = ({
  createNew,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl
  }) => {

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