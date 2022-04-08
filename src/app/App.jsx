import 'libs/CSSNormalizer.scss'
import './style.scss'

import { useStore } from 'core'

import React from 'react'
import Router from 'router'

export const App = () => {
  const store = useStore()
  

  return (
    <>
      <header className="container">
        <h3>Lost Ark Manager</h3>
      </header>
      <main>
        <Router></Router>
      </main>
      <footer></footer>
    </>
  )
}

export default App
