import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Nav = ({ setUser, user }) => {
  const dispatch = useDispatch()
  return (
    <div className="nav">
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>

      {user &&
        <>
          <em>{user.name} is logged in</em>
          <button onClick={() => {
            dispatch(setNotification('logged out successfully', 10))
            setUser(null)
            window.localStorage.removeItem('loggedBlogappUser')
          }}>logout
          </button>
        </>
      }
    </div>
  )
}
export default Nav