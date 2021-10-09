const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper.js')

test('there are the right number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog id is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    'title': 'Blog3',
    'author': 'Author3',
    'url': 'Url3',
    'likes': 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  const author = blogsAtEnd.map(b => b.author)
  expect(author).toContainEqual(
    'Author3'
  )
})

test('if likes is undefined return 0', async () => {
  const newBlog = {
    title: 'Title3',
    author: 'Author3',
    url: 'Url3',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogsAtEnd.map(b => b.likes)
  expect(likes).toContainEqual(0)
})

test('a blog without title and url is not added', async () => {
  const newBlog = {
    author: 'Author4',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const title = blogsAtEnd.map(r => r.title)

  expect(title).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})