import React, { useState, useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Nav from './components/Nav'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import userService from './services/users'

const App = () => {
  const [viewToggle, setViewToggle] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)

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

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
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
      dispatch(setNotification('logged in successfully', 10))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 10))
    }
  }

  const createNewBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`added blog ${blogObject.title} by ${blogObject.author}`, 10))
      blogs.concat(...blogs, blogObject)
    } catch (exception) {
      dispatch(setNotification('error', 10))
    }
  }

  const updateBlog = async (blogId, blogObject) => {
    await blogService.update(blogId, blogObject)
    setUser(user)
    dispatch(setNotification(`liked blog ${blogObject.title} by ${blogObject.author}`, 10))
  }

  const removeBlog = async (id, blogObject, user) => {
    window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    try {
      await blogService.remove(id, blogObject, user)
      setUser(user)
      dispatch(setNotification(`removed blog ${blogObject.title} by ${blogObject.author}`, 10))
    }
    catch (exception){
      dispatch(setNotification('error', 10))
    }
  }

  const hideWhenVisible = { display: viewToggle ? 'none' : '' }
  const showWhenVisible = { display: viewToggle ? '' : 'none' }

  const matchUser = useMatch('/users/:id')
  const userMatch = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blogMatch = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  if (user === null) {
    return (
      <div className="container">
        <LoginForm
          handleLogin={handleLogin}
          setNotification={setNotification}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path="/blogs" element={
          <Blogs
            user={user}
            setUser={setUser}
            blogs={blogs}
            setViewToggle={setViewToggle}
            createNewBlog={createNewBlog}
            hideWhenVisible={hideWhenVisible}
            showWhenVisible={showWhenVisible}
          />
        }>
        </Route>
        <Route path="/blogs/:id" element={
          <Blog
            blogMatch={blogMatch}
            user={user}
            setUser={setUser}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        }>
        </Route>
        <Route path="/users" element={<Users users={users}/>}>
        </Route>
        <Route path="/users/:id" element={<User userMatch={userMatch}/>}>
        </Route>
        <Route path="/" element={<div className="container"><h3>Blogs App</h3></div>}>
        </Route>
      </Routes>
    </div>
  )
}

export default App