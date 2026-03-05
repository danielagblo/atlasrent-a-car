import '../styles.css'
import '../styles/admin.css'
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }){
  const hideLayout = Component.noLayout === true

  return (
    <div className="app-root">
      <a className="skip-link" href="#site-main">Skip to content</a>
      {!hideLayout && <Navbar />}
      <main id="site-main">
        <Component {...pageProps} />
      </main>
      {!hideLayout && <Footer />}
    </div>
  )
}
