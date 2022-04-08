import moment from 'moment'
import { IS_BROWSER } from './developmentConstants'

export { locationMatch } from '../../src/core/helpers'

const ricRafShim = func => setTimeout(func, 0)
export const raf =
  IS_BROWSER && self.requestAnimationFrame ? self.requestAnimationFrame : ricRafShim
export const ric =
  IS_BROWSER && self.requestIdleCallback ? self.requestIdleCallback : ricRafShim

export const debounce = (fn, wait) => {
  let timeout
  const debounced = function () {
    const ctx = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(ctx, args)
    }, wait)
  }
  debounced.cancel = () => {
    clearTimeout(timeout)
  }
  return debounced
}

export const extractValue = (object, string) => {
  const stringArray = string.split('.')
  const stringLength = stringArray.length
  const newObject = object[stringArray[0]]
  const shiftedString = stringArray.slice()
  shiftedString.shift()
  const newString = shiftedString.join('.')
  let result = {}
  if (newObject || newObject === 0) {
    result = stringLength > 1 ? extractValue(newObject, newString) : newObject
  } else result = null
  return result
}

export const isObject = object =>
  Object.prototype.toString.call(object) === '[object Object]'

export const isFunction = functionParam =>
  functionParam && {}.toString.call(functionParam) === '[object Function]'

export const formatDate = value => moment(value).format('DD.MM.YYYY HH:mm:ss')

export const matchPassword = (a, b) => {
  if (a === b) return true
  const trimA = a === undefined || a === null ? '' : String(a).trim()
  const trimB = b === undefined || b === null ? '' : String(b).trim()
  return trimA === trimB
}

export const classes = (...args) => args.map(e => String(e).trim()).join(' ')
