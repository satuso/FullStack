const commentsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('comments', { content : 1, id: 1 })
  response.json(blog)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const id = request.params.id
  const blog = await Blog.findById(id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const comment = new Comment({
    content: body.content,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment.toJSON())
})

module.exports = commentsRouter