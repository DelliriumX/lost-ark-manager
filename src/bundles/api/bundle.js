import { createBundle } from 'core'

export default config =>
  createBundle({
    name: 'api',
    priority: null,
    reducer: null,
    selectors: null,
    actions: null,
    init: null,
    args: store => {
      const executor = (path, options, service) => {
        if (!path) throw new Error('Path not supplied to the API executor')
        if (!options) throw new Error('Options not supplied to the API executor')

        const request = fetch(path, options).then(
          res =>
            res.ok ? res.json() : res.json().then(error => Promise.reject(error)) // errorHandler(res, path, options)
        )
        return request
      }

      const api = (path = '/', options = {}, auth) => {
        const resource = `${config.path}${path}`
        const defaultOptions = config.options || null

        const requestOptions = defaultOptions
          ? {
              ...defaultOptions,
              options,
              ...{ headers: { ...defaultOptions.headers, ...options.headers } },
              ...{ body: JSON.stringify(options.body) },
            }
          : options

        if (requestOptions.credentials !== 'omit' && config.authorization) {
          let token = ''
          const { type } = config.authorization
          if (config.authorization.source === 'store') {
            token = store[config.authorization.selector]()
          } else if (config.authorization.source === 'config') {
            token = config.authorization.token
          } else {
            // TODO: extend as needed
          }
          if (token) {
            requestOptions.headers = requestOptions.headers || {}
            requestOptions.headers.Authorization = `${type} ${token}`
          }
        }
        return executor(resource, requestOptions, 'api')
      }
      api.path = config.path
    },
    middleware: null,
    persist: null,
  })
