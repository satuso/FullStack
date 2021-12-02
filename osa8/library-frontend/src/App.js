import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const resultAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  const [books, setBooks] = useState(resultBooks.data)

  useEffect(() => {
    if (resultBooks.data) setBooks(resultBooks.data.allBooks)
  }, [resultBooks])

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (resultAuthors.loading || resultBooks.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <><button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button></> :  
        <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Authors
        show={page === 'authors'}
        authors={resultAuthors.data.allAuthors}
      />
      <Books
        show={page === 'books'}
        setBooks={setBooks}
        books={books}
      />
      <NewBook
        show={page === 'add'}
        setPage={setPage}
      />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App