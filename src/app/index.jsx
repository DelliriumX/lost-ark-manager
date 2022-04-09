import React from 'react'
import ReactDOM from 'react-dom'
import Core, { cache } from 'core'
import 'libs/CSSNormalizer.scss'
import 'style.scss'

// GLOBAL COMPONENT IMPORTS

// ROUTER IMPORTS
import AppRouter from 'router'

const App = () => {
  return (
    <React.StrictMode>
      <header className="container">
        <h3>Lost Ark Manager</h3>
      </header>
      <main>
        <AppRouter></AppRouter>
      </main>
      <footer></footer>
    </React.StrictMode>
  )
}

cache.getAll().then(initialData => {
  if (initialData) {
    // console.log('starting with locally cache data:', initialData)
  }
  ReactDOM.render(
    <Core preloadedData={initialData}>
      <App />
    </Core>,
    document.getElementById('root')
  )
})
