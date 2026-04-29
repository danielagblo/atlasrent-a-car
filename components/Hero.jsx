import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import IMAGES from '../data/images'
import { ArrowRight, ChevronRight } from 'lucide-react'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [pickUpDate, setPickUpDate] = useState('')
  const [category, setCategory] = useState('All')
  const heroBgUrl = IMAGES.hero || '/hero-placeholder.jpg'

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url('${heroBgUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: isMobile ? '100px 24px 60px' : '0 72px',
        position: 'relative',
        marginTop: 0,
      }}
    >
      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 100%)',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 880 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 999,
            padding: '6px 16px',
            marginBottom: 28,
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-gold)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Ghana's Finest Fleet
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ marginBottom: 28 }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: isMobile ? 48 : 76,
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Premium Rides,
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              fontSize: isMobile ? 48 : 76,
              fontWeight: 900,
              fontStyle: 'italic',
              color: 'var(--accent-gold)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Exceptional Service.
          </motion.h1>
        </div>

        {/* Subtitle with left bar */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            fontSize: isMobile ? 15 : 17,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.65,
            marginBottom: 44,
            borderLeft: '3px solid var(--accent-gold)',
            paddingLeft: 16,
            maxWidth: 480,
          }}
        >
          Experience the ultimate in private mobility. Premium vehicles, elite chauffeurs, and 24/7 assistance across Ghana.
        </motion.p>

        


      {/* Booking panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '1000px',
          marginTop: 48,
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : 'unset',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr) auto',
          gap: isMobile ? 16 : 0,
          alignItems: 'center',
          background: '#fff',
          padding: isMobile ? '24px' : '12px 12px 12px 24px',
          borderRadius: 20,
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div className="booking-field-group" style={{ borderRight: isMobile ? 'none' : '1px solid #eee', paddingRight: isMobile ? 0 : 20 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Location</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '8px 0', border: 'none', background: 'transparent', fontWeight: 700, fontSize: 15, outline: 'none', color: '#0f172a' }}>
              <option value="" disabled>Select City</option>
              <option value="accra">Accra (HQ)</option>
              <option value="takoradi">Takoradi</option>
              <option value="kumasi">Kumasi</option>
            </select>
          </div>

          <div className="booking-field-group" style={{ borderRight: isMobile ? 'none' : '1px solid #eee', padding: isMobile ? 0 : '0 20px' }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Pick-up Date</label>
            <input type="date" value={pickUpDate} onChange={(e) => setPickUpDate(e.target.value)} style={{ width: '100%', padding: '8px 0', border: 'none', background: 'transparent', fontWeight: 700, fontSize: 15, outline: 'none', color: '#0f172a' }} />
          </div>

          <div className="booking-field-group" style={{ borderRight: isMobile ? 'none' : 'none', padding: isMobile ? 0 : '0 20px' }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Vehicle Class</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px 0', border: 'none', background: 'transparent', fontWeight: 700, fontSize: 15, outline: 'none', color: '#0f172a' }}>
              <option value="All">All Categories</option>
              <option value="Premium Cars">Premium</option>
              <option value="Luxury Cars">Luxury</option>
              <option value="Business Cars">Business</option>
              <option value="Economic Cars">Economic</option>
            </select>
          </div>

          <button
            onClick={() => {
              if (category && category !== 'All') {
                router.push(`/vehicles?category=${encodeURIComponent(category)}`)
              } else {
                router.push('/vehicles')
              }
            }}
            style={{
              background: 'var(--accent-gold)',
              color: '#fff',
              border: 'none',
              padding: isMobile ? '16px' : '16px 32px',
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 14,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: '0.3s',
              boxShadow: '0 10px 20px rgba(223, 151, 56, 0.3)',
              width: isMobile ? '100%' : 'auto'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Find Vehicle
          </button>
        </div>
      </motion.div>
      </div>

      {/* Scroll indicator */}
      {!isMobile && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            zIndex: 1,
          }}
        >
          Scroll to explore
        </motion.div>
      )}
    </section>
  )
}