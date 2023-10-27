import { useState } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/styles/main.scss'

import { store } from './store/store'

import { Home } from './views/Home'
import { AppIndex } from './views/AppIndex'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Routes>
            {/* <Route element={<Home />} path="/" /> */}
            <Route element={<AppIndex />} path="/" />
          </Routes>
        </main>
      </Router >
    </Provider>
  )
}

export default App
