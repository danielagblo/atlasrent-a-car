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
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#071029" />
      </Head>
      <a className="skip-link" href="#site-main">Skip to content</a>
      {!hideLayout && <Navbar />}
      <main id="site-main">
        <Component {...pageProps} />
      </main>
      {!hideLayout && <Footer />}

      {/* Floating WhatsApp Icon */}
      <a 
        href="https://wa.me/233202225878" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#25D366',
          color: '#fff',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)',
          zIndex: 1000,
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 30px rgba(37, 211, 102, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(37, 211, 102, 0.3)';
        }}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L22 4l-1.5 5.5Z"/>
          <path d="M17 10c.3.3.5.7.5 1.1s-.2.8-.5 1.1l-2.2 2.2c-.3.3-.7.5-1.1.5s-.8-.2-1.1-.5l-2.2-2.2c-.3-.3-.5-.7-.5-1.1s.2-.8.5-1.1l2.2-2.2c.3-.3.7-.5 1.1-.5s.8.2 1.1.5l2.2 2.2Z" style={{ display: 'none' }} />
          <path d="M9 12a5 5 0 0 0 5 5" stroke="white" fill="none" />
          <path d="M12 9a5 5 0 0 1 5 5" stroke="white" fill="none" />
          {/* Custom WhatsApp Icon Path */}
          <path 
            fill="white" 
            stroke="none"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.045c0 2.121.554 4.191 1.606 6.04L0 24l6.111-1.605A11.79 11.79 0 0012.046 24h.005c6.634 0 12.043-5.412 12.046-12.047a11.813 11.813 0 00-3.638-8.504z"
          />
        </svg>
      </a>
    </div>
  )
}
