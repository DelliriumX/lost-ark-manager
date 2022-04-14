import React from 'react'
import { Switch, Route, Redirect, useStore } from 'core'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import MarketPage from '../pages/MarketPage'

const Router = () => {
  const { user } = useStore('selectUser')

  if (!user)
    return (
      <Switch>
        <Route path="/" component={LoginPage}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    )
  if (user)
    return (
      <Switch>
        <Route path="/" component={MarketPage}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    )
}

export default Router
