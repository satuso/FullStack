import React from 'react'
import Notification from './Notification'
import CreateForm from './CreateForm'
import { Link } from 'react-router-dom'

const Blogs = ({
  user,
  setUser,
  blogs,
  setViewToggle,
  createNewBlog,
  hideWhenVisible,
  showWhenVisible,
}) => {

  return (
    <div className="container">
      {user && <>
        <h2>Blogs</h2>
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
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )}
      </>
      }
    </div>
  )
}
export default Blogs