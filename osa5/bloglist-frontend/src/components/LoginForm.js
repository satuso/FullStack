import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  errorMessage,
  message,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {

  return (
    <div>
      <h2>Login to application</h2>
      <p className="error">{errorMessage}</p>
      <p className="success">{message}</p>
      <form onSubmit={handleLogin}>
        <label>username:
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <br />
        <label>password:
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          /></label>
        <br />
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm