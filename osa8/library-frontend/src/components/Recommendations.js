import React from 'react'

const Recommendations = (props) => {

  const filterBooks = !props.favoriteGenre ? props.books : props.books.filter(b => b.genres.includes(props.favoriteGenre))

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      {props.favoriteGenre && <p>books in your favorite genre: <b>{props.favoriteGenre}</b></p>}
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
    </div>
  )
}

export default Recommendations