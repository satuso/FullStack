import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import Notification from './components/Notification'

const App = () => {
  const [createVisible, setCreateVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

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
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 10))
    }
  }

  const updateBlog = async (blogId, blogObject) => {
    await blogService.update(blogId, blogObject)
    const updatedBlog = { ...blogObject, blogId }
    setUser(user)
    setBlogs(
      blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
    )
    dispatch(setNotification(`liked blog ${blogObject.title}`, 10))
  }

  const removeBlog = async (id, blogObject, user) => {
    window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    try {
      await blogService.remove(id, blogObject, user)
      setUser(user)
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs(updatedBlogs)
      dispatch(setNotification(`removed blog ${blogObject.title} ${blogObject.author}`, 10))
    }
    catch (exception){
      dispatch(setNotification('error', 10))
    }
  }

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        setNotification={setNotification}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
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
          <Notification />
          <div style={showWhenVisible}>
            <CreateForm
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
            removeBlog={removeBlog}
            user={user}
            setUser={setUser}
          />
        )}
      </>
      }

    </div>
  )
}

export default App