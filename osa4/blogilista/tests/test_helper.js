const Blog = require('../models/blog')

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}