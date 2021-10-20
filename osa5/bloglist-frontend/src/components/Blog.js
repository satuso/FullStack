import React, {useState} from 'react'
const Blog = ({blog}) => {
  const [viewToggle, setViewToggle] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { display: viewToggle ? 'none' : '' }
  const showWhenVisible = { display: viewToggle ? '' : 'none' }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setViewToggle(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setViewToggle(false)}>view</button><br />
        {blog.url}<br />
        likes 0 <button>like</button><br />
        {blog.user.name}<br />
      </div>  
    </div>
  )
}
export default Blog