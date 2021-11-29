import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

const Authors = (props) => {

  const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $born: Int) {
      editAuthor(name: $name, setBornTo: $born) {
        name
        born
      }
    }
  `

  const [name, setName] = useState('')
  const [born, setBorn ] = useState('')

  const [ updateAuthor, result ] = useMutation(UPDATE_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()
    console.log('edit author...')
    updateAuthor({  variables: { name, born: parseInt(born) } })
    setName('')
    setBorn('')
    console.log(`updated ${name}, born ${born}`)
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
      <div>
        name: 
      <select defaultValue={name} onChange={({ target }) => setName(target.value)}>
        {props.authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
      </select>
      </div>
      <div>
        born:
        <input
          value={born}
          type='number'
          onChange={({ target }) => setBorn(target.value)}
        >
        </input>
      </div>
      <div>
        <button type='submit'>submit</button>
      </div>
      </form>
    </div>
  )
}

export default Authors