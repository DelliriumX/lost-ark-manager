import React from "react"
import { Switch, Route, Redirect, useStore } from 'core'

import Dashboard from '../pages/Dashboard'

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Dashboard}></Route>
    </Switch>
  )
}

export default Router
