import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout(){
  return (
    <div className="app-root">
      <a className="skip-link" href="#site-main">Skip to content</a>
      <Navbar />
      <main id="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
