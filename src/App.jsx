import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Models from './pages/Models'
import ModelDetail from './pages/ModelDetail'
import Contact from './pages/Contact'
import Orders from './pages/Orders'
import OrderPage from './pages/OrderPage'
import Mission from './pages/Mission'
import Admin from './pages/Admin'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="models/:id" element={<ModelDetail />} />
        <Route path="order/:id" element={<OrderPage />} />
        <Route path="mission" element={<Mission />} />
        <Route path="contact" element={<Contact />} />
        <Route path="orders" element={<Orders />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}
