import React from "react"
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Dashboard}></Route>
    </Switch>
  )
}

export default Router
