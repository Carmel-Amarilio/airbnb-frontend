import { useState } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/styles/main.scss'

import { store } from './store/store'

import { Home } from './views/Home'
import { AppIndex } from './views/AppIndex'
import { StayDetails } from './views/StayDetails'
import { AddStay } from './views/AddStay'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AppIndex />} path="/stay" />
            <Route path="/stay/:stayId" element={<StayDetails />} />
            <Route element={<AddStay />} path="/about-your-place" />
          </Routes>
        </main>
      </Router >
    </Provider>
  )
}

export default App
