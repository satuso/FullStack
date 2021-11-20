import React from 'react'
import { Link } from 'react-router-dom'

const Users = ( { users }) => {
  return (
    <div className="container">
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><h3>blogs created</h3></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users