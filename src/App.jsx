import { useState } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/styles/main.scss'

import { store } from './store/store'

import { Home } from './views/Home'
import { AppIndex } from './views/AppIndex'
import { StayDetails } from './views/StayDetails'
import { AddStay } from './views/AddStay'
import { OrderStay } from './views/OrderStay'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AppIndex />} path="/stay" />
            <Route path="/stay/:stayId" element={<StayDetails />} />
            <Route path="/stay/order/:stayId/:checkIn/:checkOut/:adults/:children/:infants/:rating/:reviews" element={<OrderStay />} />
            <Route element={<AddStay />} path="/about-your-place" />
          </Routes>
        </main>
      </Router >
    </Provider>
  )
}

export default App
