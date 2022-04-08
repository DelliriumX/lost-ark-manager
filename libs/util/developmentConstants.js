let debug = false
try {
  debug = !!window.localStorage.debug
} catch (e) {}
export const HAS_DEBUG_FLAG = debug || false
export const HAS_WINDOW = typeof window !== 'undefined'
export const IS_BROWSER = HAS_WINDOW || typeof self !== 'undefined'
export const IS_PROD = process.env.NODE_ENV === 'production'
