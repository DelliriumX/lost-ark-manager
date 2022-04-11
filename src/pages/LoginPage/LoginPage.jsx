import 'Page-Login.scss'

import { useStore } from 'core'
import { useState } from 'react'

const LoginPage = () => {
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useStore('login')

  const usernameChangeHandler = e => setUser(e.target.value)
  const passwordChangeHandler = e => setPassword(e.target.value)

  const loginHandler = e => {
    e.preventDefault()
    login({ username: username, password: password })
  }

  return (
    <div className="LoginPage-wrapper">
      <h1>Login Page</h1>
      <h3>Use any combination.</h3>
      <form onSubmit={loginHandler}>
        <label htmlFor="username"></label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          required
          value={username}
          onChange={usernameChangeHandler}
        ></input>
        <label htmlFor="password"></label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={passwordChangeHandler}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
