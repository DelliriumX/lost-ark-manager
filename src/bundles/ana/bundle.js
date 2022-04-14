const { createStore } = require('redux')

const USERS_DATA_FETCH_STARTED = 'USERS_DATA_FETCH_STARTED'
const USERS_DATA_FETCH_SUCCEDED = 'USERS_DATA_FETCH_SUCCEDED'
const USERS_DATA_FETCH_FAILED = 'USERS_DATA_FETCH_FAILED'

const updateUsers = (id) => dispatch => {
  dispatch({ type: USERS_DATA_FETCH_STARTED })
  fetch('...users')
    .then(res => res.json())
    .then(users => {
      dispatch({ type: USERS_DATA_FETCH_SUCCEDED, payload: users })
    })
    .catch(err => dispatch({ type: USERS_DATA_FETCH_FAILED }))
}

const initialState = {
  users: [],
  isLoading: false,
  fetchError: null,
  dataValid: false,
}

const reducer = (state = initialState, action) => {

  if (action.type === USERS_DATA_EXPIRED) {
    return { ...state, dataValid: false }
  }
  if (action.type === USERS_DATA_FETCH_STARTED) {
    return { ...state, isLoading: true }
  }
  if (action.type === USERS_DATA_FETCH_SUCCEDED) {
    return { ...state, users: action.payload, isLoading: false, dataValid: true }
  }
  if (action.type === USERS_DATA_FETCH_FAILED) {
    return { ...state, isLoading: false, fetchError: action.error }
  }
  return state
}

const userReactor = store => {
  const { isLoading, users, dataValid } = store
  if (isLoading || dataValid) return null
  if (!users.length || !dataValid) return updateUsers()
}

const thunk = store => next => action => {
  if (typeof action === 'function') action(dispatch)
  else next(action)
}

const enhancer = store => next => action => {
  const state = store.getState()
  const action = userReactor(state)
  action && dispatch(action)
  next(action)
}
