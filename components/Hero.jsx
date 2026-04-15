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
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        src={heroBgUrl}
        alt="Luxury Fleet"
        className="hero-video-bg"
      />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0.7) 60%, rgba(255, 255, 255, 0) 100%)',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>

      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Premium Vehicles, <br />
          <span className="gradient-text">Exceptional Service.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experience the ultimate in private mobility. Premium vehicles, elite chauffeurs, and 24/7 concierge service across Ghana.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-booking-widget"
        >
          <div className="booking-field-group">
            <label>Pick-up Location</label>
            <select defaultValue="">
              <option value="" disabled>Select City</option>
              <option value="accra">Accra (HQ)</option>
              <option value="takoradi">Takoradi</option>
              <option value="kumasi">Kumasi</option>
            </select>
          </div>

          <div className="booking-field-group">
            <label>Pick-up Date</label>
            <input type="date" />
          </div>

          <div className="booking-field-group">
            <label>Vehicle Type</label>
            <select defaultValue="">
              <option value="" disabled>Select Class</option>
              <option value="Business Cars">Business Cars</option>
              <option value="Economic Cars">Economic Cars</option>
              <option value="Luxury Cars">Luxury Cars</option>
              <option value="Premium Cars">Premium Cars</option>
            </select>
          </div>

          <button className="btn-premium" onClick={() => router.push('/models')}>
            Find Car
          </button>
        </motion.div>
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
            color: 'var(--text-secondary)'
          }}
        >
          Scroll to explore
        </motion.div>
      )}
    </section>
  )
}