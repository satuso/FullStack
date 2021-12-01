import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

const ALL_DATA = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    },
    allBooks {
      title
      published
      author {
        name
        born
        id
        bookCount
      }
    }
  }
`
const App = () => {
  const [page, setPage] = useState('authors')

  const result = useQuery(ALL_DATA, {
    pollInterval: 2000
  })

  if (result.loading)  {
    return <div>loading...</div>
  }
  const books = result.data ? result.data.allBooks : []
  console.log(books)
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={result.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App