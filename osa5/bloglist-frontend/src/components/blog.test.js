import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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
      <Blog
        blog={blog}
        user={user}
      />
    )
    expect(component.container).toHaveTextContent('title')
    expect(component.container).toHaveTextContent('author')

    expect(component.container.user).toBeUndefined()
    expect(component.container.likes).toBeUndefined()
  })

  test('renders url and likes when view button is pressed', () => {
    const component = render(
      <Blog
        blog={blog}
        user={user}
      />
    )
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)
  })
})