import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import IMAGES from '../data/images'
import { ArrowRight, ChevronRight } from 'lucide-react'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
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

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>

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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
        >
          {/* Primary Button */}
          <Link href="/vehicles" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(223,151,56,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'var(--accent-gold)',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: isMobile ? '14px 28px' : '16px 36px',
                fontSize: 14,
                fontWeight: 800,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'background 0.3s',
              }}
            >
              Browse Fleet <ChevronRight size={18} strokeWidth={2.5} />
            </motion.button>
          </Link>

          {/* Secondary Button */}
          <Link href="/about" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ background: 'rgba(255,255,255,0.15)', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 999,
                padding: isMobile ? '14px 28px' : '16px 36px',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s',
              }}
            >
              Discover Our Story <ArrowRight size={16} />
            </motion.button>
          </Link>
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