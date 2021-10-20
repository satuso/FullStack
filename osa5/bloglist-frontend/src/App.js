import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [createVisible, setCreateVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

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

  const updateBlog = async (blogId, blogObject) => {
    await blogService.update(blogId, blogObject)
    const updatedBlog = {...blogObject, blogId}
    setBlogs(
      blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
    )
  }

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

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
        <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>create</button>
        </div>
        <p className="error">{errorMessage}</p>
        <p className="success">{message}</p>
        <div style={showWhenVisible}>
          <CreateForm 
            setMessage={setMessage}
            setErrorMessage={setErrorMessage}
            user={user}
            setUser={setUser}
            blogs={blogs}
            setBlogs={setBlogs}
            setCreateVisible={setCreateVisible}
          />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
        <br />
        {blogs.sort((min, max) => max.likes - min.likes).map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            updateBlog={updateBlog}
          />
        )}
      </>
      }
      
    </div>
  )
}

export default App