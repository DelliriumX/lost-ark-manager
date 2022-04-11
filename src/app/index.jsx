import ReactDOM from 'react-dom'
import Core, { cache } from 'core'
import 'App.scss'

import AppRouter from 'router'

const App = () => {
  return (
    <React.StrictMode>
      <header></header>
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
  document.body.setAttribute('oncontextmenu', 'return false')
  document.body.setAttribute('onselectstart', 'return false')
  document.body.setAttribute('ondragstart', 'return false')
  ReactDOM.render(
    <Core preloadedData={initialData}>
      <App />
    </Core>,
    document.getElementById('root')
  )
})
