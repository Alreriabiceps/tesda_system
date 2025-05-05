import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router'


import Login from './components/Login'
import Dashboard from './pages/Reservation/Dashboard'
import NewReservation from './pages/Reservation/NewReservation'
import ReservationList from './pages/Reservation/ReservationList'


import RESLayout from './layouts/RESLayout'
import POSLayout from './layouts/POSLayout'
import ChangePassword from './components/ChangePassword'
import Home from './pages/Home'

import POSDashboard from './pages/Pointofsales/POSDashboard'
import ItemList from './pages/Pointofsales/ItemList'
import AddItem from './pages/Pointofsales/AddItem'
import EditItem from './pages/Pointofsales/EditItem'
import ProductPOS from './pages/Pointofsales/ProductPOS'




function App() {

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route element={<RESLayout />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-reservation" element={<NewReservation />} />
          <Route path="/reservation-list" element={<ReservationList />} />
          <Route path="/change-password" element={<ChangePassword />} />

        </Route>

        <Route element={<POSLayout />} >
          <Route path="/pos-dashboard" element={<POSDashboard />} />
          <Route path="/item-list" element={<ItemList />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
          <Route path="/product-pos" element={<ProductPOS />} />




        </Route>




      </Routes>
    </Router>
  )
}

export default App
