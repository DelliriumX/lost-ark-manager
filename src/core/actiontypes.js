//  CORE
export const BATCH_ACTIONS = 'BATCH_ACTIONS' // Action for dispatching multiple actions
export const DEBUG_ENABLED = 'DEBUG_ENABLED' //  Debugger has been enabled
export const DEBUG_DISABLED = 'DEBUG_DISABLED' //  Debugger has been disabled
export const ROUTER_URL_UPDATED = 'ROUTER_URL_UPDATED' // Url was updated by an action or browser navigation
export const ROUTER_URL_REDIRECTED = 'ROUTER_URL_REDIRECTED' // Router was redirected by a reactor, SSE or in some otherway

//  AUTH
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT' //  Client has been logged out
export const LOGIN_REQUEST_STARTED = 'LOGIN_REQUEST_STARTED' //  Client attempted to log in
export const LOGIN_REQUEST_SUCCEEDED = 'LOGIN_REQUEST_SUCCEEDED' //  Server responded with a successful log in response
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED' //  Server responded with a failed log in response

// USER PREFS
export const USER_PREFS_UPDATED = 'USER_PREFS_UPDATED' // User changed preferences