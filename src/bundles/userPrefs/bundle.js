import { createBundle } from 'core'
import { USER_PREFS_UPDATED } from 'core/actiontypes'

const initialState = {
  version: VERSION,
}

export default config =>
  createBundle({
    name: 'userPrefs',
    reducer: (state = initialState, { type, payload }) => {
      if (type === USER_PREFS_UPDATED) {
        return { ...state, [payload.prefKey]: payload.data }
      }
      return state
    },
    selectors: {
      selectPref: state => state.userPrefs,
    },
    actions: {
      updatePref: payload => ({ type: USER_PREFS_UPDATED, payload }),
    },
    init: null,
    args: null,
    middleware: null,
    persist: [USER_PREFS_UPDATED],
  })
