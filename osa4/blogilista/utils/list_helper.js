const _ = require('lodash')

const dummy = (blogs) => {
  if (blogs) return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0){
    return 0
  } else {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
  }
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((accumulator, currentValue) => {
    return accumulator.likes > currentValue.likes ? accumulator : currentValue})
  return result
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const author = _.head(_(authors)
    .countBy()
    .entries()
    .maxBy(_.last))
  const number = authors.filter(authorName => authorName === author).length
  return {author: author, blogs: number}
}

const mostLikes = (blogs) => {
  const groupBy = _.groupBy(blogs, 'author')
  const sumLikes = _.map(groupBy, (value, key) => {
    return {
      author: key,
      likes: value.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
    }
  })
  return _.maxBy(sumLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}