import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery } from '@apollo/client'
import { ALL_DATA } from './queries'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_DATA, {
    pollInterval: 2000
  })

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (result.loading)  {
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
        authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={result.data.allBooks}
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