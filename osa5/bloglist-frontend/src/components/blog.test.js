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
  const user = blog.user.username

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

  test('eventhandler is called twice when like button is clicked twice', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={mockHandler}
      />
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})