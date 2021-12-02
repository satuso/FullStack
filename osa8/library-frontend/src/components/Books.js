import React, { useState } from 'react'

const Books = ({ books, setBooks, show }) => {
  const [genre, setGenre] = useState(null)

  const filterBooks = !genre ? books : books.filter(b => b.genres.includes(genre))

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genre ? <p>in genre <b>{genre}</b></p> : <p>all genres</p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filterBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {books.map(b => b.genres.map(genre => 
      <button onClick={() => setGenre(genre)} key={genre}>{genre}</button>))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books