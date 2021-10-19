import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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
      setBlogs(blogs)
    } catch (exception) {
      setErrorMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <p className="error">{errorMessage}</p>
        <p className="success">{message}</p>
        <form onSubmit={handleLogin}>
          <label>username:
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          </label>
          <br />
                <label>password:
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          /></label>
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {user && <>
        <h2>blogs</h2>
        <p>{user.name} is logged in 
        <button onClick={() => {
          setUser(null)
          window.localStorage.removeItem('loggedBlogappUser')
        }}>logout
        </button></p>
        <p className="error">{errorMessage}</p>
        <p className="success">{message}</p>
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
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
      }
      
    </div>
  )
}

export default App