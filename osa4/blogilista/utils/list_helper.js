const dummy = (blogs) => {
  if (blogs) return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0){
    return 0
  } else {
    const reducer = (sum, item) => {
      console.log(sum, item.likes)
      return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
  }
}

module.exports = {
  dummy,
  totalLikes
}