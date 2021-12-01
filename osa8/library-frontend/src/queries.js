import { gql } from '@apollo/client'

export const ALL_DATA = gql`
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`