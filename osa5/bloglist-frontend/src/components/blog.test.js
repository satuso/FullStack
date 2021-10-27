import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('test blog component', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url.com',
    likes: 2,
    user: {
      username: 'user1',
      name: 'name',
    }
  }
  const user = blog.user.name

  test('renders title and author', () => {

    const component = render(
      <Blog blog={blog} user={user}/>
    )

    expect(component.container).toHaveTextContent(
      'title'
    )
    expect(component.container.user).toBeUndefined()
    expect(component.container.likes).toBeUndefined()
  })

})