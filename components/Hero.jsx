import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { getCldImageUrl } from './CldOptimizedImage'
import React, { useState, useEffect } from 'react'
import IMAGES from '../data/images'

export default function Hero() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // Generate Cloudinary URL for CSS background
  const heroBgUrl = IMAGES.hero?.startsWith('http') || IMAGES.hero?.startsWith('/')
    ? IMAGES.hero
    : getCldImageUrl({
      src: IMAGES.hero || 'hero-placeholder',
      width: 1920,
      height: 1080,
      crop: 'fill',
      gravity: 'center'
    });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="hero-section">
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        src={heroBgUrl}
        alt="Luxury Fleet"
        className="hero-video-bg"
      />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, #080814 20%, rgba(8, 8, 20, 0.8) 50%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-content" style={{ padding: 0 }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 40, height: 2, background: 'var(--accent-gold)' }}></div>
              <span style={{ color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: 12 }}>Atlas Luxury Fleet</span>
            </div>
            
            <h1>
              Elevate Your <br />
              <span className="gradient-gold">Journey.</span>
            </h1>

            <p>
              Experience the pinnacle of private mobility. Premium vehicles, elite chauffeurs, and 24/7 bespoke service across Ghana.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hero-booking-widget"
            >
              <div className="booking-field-group">
                <label>Arrival City</label>
                <select defaultValue="">
                  <option value="" disabled>Select Location</option>
                  <option value="accra">Accra (HQ)</option>
                  <option value="takoradi">Takoradi</option>
                  <option value="kumasi">Kumasi</option>
                </select>
              </div>

              <div className="booking-field-group">
                <label>Service Date</label>
                <input type="date" />
              </div>

              <div className="booking-field-group">
                <label>Vehicle Class</label>
                <select defaultValue="">
                  <option value="" disabled>Select Class</option>
                  <option value="Business Cars">Business Cars</option>
                  <option value="Economic Cars">Economic Cars</option>
                  <option value="Luxury Cars">Luxury Cars</option>
                  <option value="Premium Cars">Premium Cars</option>
                </select>
              </div>

              <button className="premium-btn premium-btn-gold" onClick={() => router.push('/vehicles')}>
                Reserve Now
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {!isMobile && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.3)',
            fontSize: 11,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            zIndex: 10
          }}
        >
          Explore the collection
        </motion.div>
      )}
    </section>
  )
}