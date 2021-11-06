import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/`)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async (id) => {
  const object = await getOne(id)
  object.votes = object.votes + 1
  const response = await axios.put(`${baseUrl}/${id}/`, object)
  return response.data
}

const exportedObject = { getAll, createNew, updateVotes }
export default exportedObject