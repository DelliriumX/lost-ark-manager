## Bundle Components

Each bundle may have the following components:

1. name\*
2. reducer
3. selectors
4. actions
5. priority
6. init
7. args
8. persist
9. middleware

## Name:

A name can be any string though kebab-case is recommended (e.g. `my-bundle`). Name is a required property of each bundle and is used for identification in the build process. Any other property is not mandatory but if not present, should be given as `null`

> If a bundle is spread across multiple files (i.e. `bundle.js` does not exist), the name is infererd from the folder name.

## Reducer:

Reducers are used to change the state of the store and they have to do this so in an immutable way. Example of reducer is given below:

```js
const initialState = { .... }

(state = initialState, { type, payload }) => {
if (type === 'ACTION_REPORT') {
....
return { ...state, ...changes}
}
return state
}
```

It is important to understand that the bundle can only ever have a single reducer, however, that reducer can be composed of multiple reducers as with normal Redux architecture and usual approach people take.

> If a bundle is spread across multiple files (i.e. `bundle.js` does not exist), then reducer is inferred from a file named `reducers.js` as it's default export.

## Selectors:

Selectors is an object of selector and reactor functions. The key determines the name which will be used and must adhere to the following pattern `select<Name>` or `react<Name>` in order to be recognized by the bundler as a selector. Example:

```js
selectors: {
  selectFirstName: store => store.firstName,
  selectLastName: store => store.lastName,
  reactLogin: store => { /* ... reactor function ...*/ }
}
```

> If a bundle is spread across multiple files (i.e. `bundle.js` does not exist), then selectors and reactors are inferred from a file named `selectors.js` by the names of their individual exports, which in this case must adhere to the naming conventions mentioned above.

## Actions:

Actions is an object of actions which we can call in our application. The key determins the name of the action used and it must consist of `[a-zA-Z0-9_]` characters as well as not start with `select`, `react` or any numeric character.

Actions can be written in two ways:

```js
// Directly dispatched
payload => ({ type: 'ACTION_REPORT', payload })

// Thunk based action
payload => (dispatch, args) => { ... }
```

The args object is something to take note of, it will be explained in the later sections.

> If a bundle is spread across multiple files (i.e. `bundle.js` does not exist), then actions are inferred from a file named `actions.js` by the names of their individual exports, which in this case must adhere to the naming conventions mentioned above.

## Init:

This is a function that is run at the application startup, when the store is being initialized. At the point of running this function, the store is already injected with all the selectors/reactors/actions and they are readily usable and available within it. This can be used for subscriptions or whatever else comes to mind.

The signature of the init function is as follows:

```js
store => {
  /* ... do stuff ... */
}
```

> If a bundle is spread across multiple files (i.e. `bundle.js` does not exist), then init function is inferred from a file named `addons.js` exported as a named export "init".

## Args:

Args is a function that is run at the time of application bundling, while the store is being initialized. At the point of running this function, the store is already injected with all the selectors/reactors/actions and they are readily usable and available within it. The args function has the following signature:

```js
store => {
  /* ... do stuff ... */
  return {
    key: value,
  }
}
```

The object returned from the Args function (along with the same objects of other bundles) is then destructured and merged together and passed as the second argument of the thunk-pattern actions. (store is also passed into this argument under the key `store`)

> If a bundle is spread across multiple files (i.e. `bundle.js` does not exist), then args function is inferred from a file named `addons.js` exported as a named export "args".

## Persist

Persist property is represented by an array of strings. These strings represent the `ACTION_REPORT_CONSTANTS` that are suppose to trigger a caching event for the bundle. If any such report reaches the store, this bundle's state result will be persisted after the store is updated.

> If a bundle is spread across multiple files (i.e. `bundle.js` does not exist), then persist value is inferred from a file named `addons.js` exported as a named export "persist".

## Middleware

Middleware property is a function that gets called by the store during the initialization process. The function is suppose to return a middleware which will then be used within the store. The order in which the middleware is added is dependant on the order of bundles in the manifest. The middleware creation function is passed a composed bundle object at compilation time. Function signature is as follows:

```js
composedBundle => store => next => action => {
  /* ... do some work ... */
  if (typeof action === 'function'){
    action(store.dispatch, {..args, store})
  }
  next(action)
}
```

> If a bundle is spread across multiple files (i.e. `bundle.js` does not exist), then middleware function is inferred from a file named `addons.js` exported as a named export "middleware".
