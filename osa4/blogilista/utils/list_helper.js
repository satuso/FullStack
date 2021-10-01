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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}