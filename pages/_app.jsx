import '../styles.css'
import '../styles/admin.css'
import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isAdmin = router.pathname.startsWith('/admin')
  const hideLayout = Component.noLayout === true || isAdmin

  return (
    <div className="app-root">
      <Head>
        <title>Atlas Rent-A-Car | Luxury Vehicle Rentals & Private Mobility</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#071029" />
      </Head>
      <a className="skip-link" href="#site-main">Skip to content</a>
      {!hideLayout && <Navbar />}
      <main id="site-main">
        <Component {...pageProps} />
      </main>
      {!hideLayout && <Footer />}
    </div>
  )
}
