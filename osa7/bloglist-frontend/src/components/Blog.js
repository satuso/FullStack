import React from 'react'
import { Link } from 'react-router-dom'
import Notification from './Notification'

const Blog = ({ user, updateBlog, removeBlog, blogMatch }) => {
  if (!blogMatch) {
    return null
  }

  const addLike = (event) => {
    event.preventDefault()
    const updatedBlog = { ...blogMatch, likes: blogMatch.likes + 1 }
    updateBlog(blogMatch.id, updatedBlog)
  }

  const comments = blogMatch.comments

  return (
    <div className="container">
      <Notification />
      <h2>{blogMatch.title} by {blogMatch.author}</h2>
      <a href={blogMatch.url} target="blank_">{blogMatch.url}</a>
      <p>{blogMatch.likes} likes <button onClick={addLike}>like</button></p>
      <p>added by <b><Link to={`/users/${blogMatch.user.id}`}>{blogMatch.user.username}</Link></b></p>
      {user.username === blogMatch.user.username && <button onClick={() => removeBlog(blogMatch.id, blogMatch, user)}>remove</button>}
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
      </ul>
    </div>
  )
}

export default Blog