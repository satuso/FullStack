const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper.js')

const user = {
  username: 'tester',
  password: 'password'
}

test('there are the right number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
})

test('blog id is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const loggedInUser = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  const newBlog = {
    'title': 'Blog3',
    'author': 'Author3',
    'url': 'Url3',
    'likes': 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${loggedInUser.body.token}`)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  const author = blogsAtEnd.map(b => b.author)
  expect(author).toContainEqual(
    'Author3'
  )
})

test('if likes is undefined return 0', async () => {
  const loggedInUser = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  const newBlog = {
    title: 'Title3',
    author: 'Author3',
    url: 'Url3',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loggedInUser.body.token}`)
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogsAtEnd.map(b => b.likes)
  expect(likes).toContainEqual(0)
})

test('a blog without title and url is not added', async () => {
  const loggedInUser = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  const newBlog = {
    author: 'Author4',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loggedInUser.body.token}`)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})



test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: 'Title3',
    author: 'Author3',
    url: 'Url3',
    likes: 4
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const likes = blogsAtEnd.map(b => b.likes)
  expect(likes).toContainEqual(4)
})

afterAll(() => {
  mongoose.connection.close()
})