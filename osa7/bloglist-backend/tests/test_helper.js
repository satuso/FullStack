const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    'title': 'Blog1',
    'author': 'Author1',
    'url': 'Url',
    'likes': 1,
    '_id': '61531d04bae26e0c86a01149'
  },
  {
    'title': 'Blog2',
    'author': 'Author2',
    'url': 'Url2',
    'likes': 2,
    '_id': '61532d8498277a4ff57215bc'
  }
]

beforeAll(async () => {
  await User.deleteMany({})
  const user = {
    username: 'tester',
    name: 'name',
    password: 'password'
  }

  await api
    .post('/api/users')
    .send(user)
    .set('Accept', 'application/json')
    .expect(200)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'none', url: 'url.com', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}