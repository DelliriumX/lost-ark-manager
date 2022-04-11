import PropTypes from 'prop-types'

const Conditional = props => {
  const { children, dependencies } = props
  let shouldRender = true
  if (Array.isArray(dependencies)) {
    shouldRender = !dependencies.some(e => (typeof e === 'function' ? !e() : !e))
  } else if (typeof dependencies === 'function') {
    shouldRender = dependencies()
  } else {
    shouldRender = dependencies
  }
  return shouldRender ? children : null
}

Conditional.propTypes = {
  children: PropTypes.node,
  dependencies: PropTypes.any,
}

export default Conditional
