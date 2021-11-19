import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const [viewToggle, setViewToggle] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs])

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
      dispatch(setNotification('logged in', 10))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 10))
    }
  }

  const createNewBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`added blog ${newBlog.title} ${newBlog.author}`, 10))
      blogs.concat(...blogs, newBlog)
      console.log(blogs)
    } catch (exception) {
      dispatch(setNotification('error', 10))
    }
  }

  console.log(blogs)
  const updateBlog = async (blogId, blogObject) => {
    await blogService.update(blogId, blogObject)
    setUser(user)
    //const updatedBlog = { ...blogObject, blogId }
    //setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)))
  }

  const removeBlog = async (id, blogObject, user) => {
    window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    try {
      await blogService.remove(id, blogObject, user)
      setUser(user)
      //const updatedBlogs = blogs.filter(blog => blog.id !== id)
      //setBlogs(updatedBlogs)
      dispatch(setNotification(`removed blog ${blogObject.title} ${blogObject.author}`, 10))
    }
    catch (exception){
      dispatch(setNotification('error', 10))
    }
  }

  const hideWhenVisible = { display: viewToggle ? 'none' : '' }
  const showWhenVisible = { display: viewToggle ? '' : 'none' }

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
            dispatch(setNotification('logged out', 10))
            setUser(null)
            window.localStorage.removeItem('loggedBlogappUser')
          }}>logout
          </button></p>
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setViewToggle(true)}>create</button>
          </div>
          <Notification />
          <div style={showWhenVisible}>
            <CreateForm
              user={user}
              setUser={setUser}
              blogs={blogs}
              setViewToggle={setViewToggle}
              createBlog={createNewBlog}
            />
            <button onClick={() => setViewToggle(false)}>cancel</button>
          </div>
        </div>
        <br />
        {blogs.sort((min, max) => max.likes - min.likes).map(blog =>
          <Blog
            blogs={blogs}
            key={blog.id}
            blog={blog}
            user={user}
            setUser={setUser}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        )}
      </>
      }

    </div>
  )
}

export default App