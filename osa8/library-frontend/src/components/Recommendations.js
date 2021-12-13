import React from 'react'

const Recommendations = ({ books, show, user }) => {
  if (!show || !user) {
    return null
  }

  const filterBooks = books.filter(book => book.genres.includes(user.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      {filterBooks && <p>books in your favorite genre: <b>{user.favoriteGenre}</b></p>}
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