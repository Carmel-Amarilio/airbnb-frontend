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
import { Listings } from './views/Listings'
import { Reservations } from './views/Reservations'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AppIndex />} path="/stay" />
            <Route element={<StayDetails />} path="/stay/:stayId" />
            <Route element={<OrderStay />} path="/stay/order/:stayId/:checkIn/:checkOut/:adults/:children/:infants/:rating/:reviews" />
            <Route element={<AddStay />} path="/about-your-place" />
            <Route element={<Listings />} path="/listings" />
            <Route element={<Reservations />} path="/reservations" />
          </Routes>
        </main>
      </Router >
    </Provider>
  )
}

export default App
