import React from 'react'

const User = ({ userMatch }) => {
  if (!userMatch) {
    return null
  }
  return (
    <div className="container">
      <h2>{userMatch.name}</h2>
      <p>{userMatch.username}</p>
      <h3>Added Blogs</h3>
      <ul>{userMatch.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
    </div>
  )
}

export default User