import { createBundle } from 'core'
import {
  USER_LOGGED_OUT,
  LOGIN_REQUEST_STARTED,
  LOGIN_REQUEST_SUCCEEDED,
  LOGIN_REQUEST_FAILED,
} from 'core/actiontypes'

const initialState = {
  token: null,
  user: null,
  loading: false,
  loginError: null,
  lastError: null,
}

export default config =>
  createBundle({
    name: 'auth',
    priority: null,
    reducer: (state = initialState, { type: action, payload, error }) => {
      if (action === USER_LOGGED_OUT) return { ...state, user: null, token: null }
      if (action === LOGIN_REQUEST_STARTED)
        return { ...state, loading: true, loginError: null }
      if (action === LOGIN_REQUEST_SUCCEEDED)
        return { ...state, loading: false, user: payload.user, token: payload.token }
      if (action === LOGIN_REQUEST_FAILED)
        return { ...state, loading: false, loginError: error, lastError: Date.now() }

      return state
    },
    selectors: {
      selectToken: store => store.auth.token,
      selectUser: store => store.auth.user,
    },
    actions: {
      logout: () => ({ type: USER_LOGGED_OUT }),
      login:
        payload =>
        (dispatch, { api }) => {
          dispatch({ type: LOGIN_REQUEST_STARTED })
          // Implement proper login logic
          setTimeout(() => {
            dispatch({
              type: LOGIN_REQUEST_SUCCEEDED,
              payload: {
                user: `${payload.username}`,
                token: 'R@ND0M-70k3N-$7R1N6',
              },
            })
          }, 100)
        },
    },
    init: null,
    args: null,
    middleware: null,
    persist: [USER_LOGGED_OUT, LOGIN_REQUEST_SUCCEEDED],
  })
