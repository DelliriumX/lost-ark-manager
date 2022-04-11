import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'core'

import { Mitar, Simeon, Marko, Charts } from 'pages/_Dev'

const DevRouter = props => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact path={`${match.path}`} to={`${match.path}/charts`} />
      <Route path={`${match.path}/simeon`} component={Simeon} />
      <Route path={`${match.path}/mitar`} component={Mitar} />
      <Route path={`${match.path}/marko`} component={Marko} />
      <Route path={`${match.path}/charts`} component={Charts} />
      <Route render={() => <div>All Dev Page</div>} />
    </Switch>
  )
}

DevRouter.propTypes = {
  match: PropTypes.exact({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.object,
    isExact: PropTypes.bool,
  }),
}

export default DevRouter
