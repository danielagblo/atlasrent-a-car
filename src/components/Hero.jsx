
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BookingBar from './BookingBar'
import IMAGES from '../data/images'

const heading = { hidden: { x: -40, opacity: 0 }, show: { x: 0, opacity: 1 } }
const cta = { hidden: { scale: .96, opacity: 0 }, show: { scale: 1, opacity: 1 } }

export default function Hero(){
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768)
  const videoRef = React.useRef(null)
  const [videoError, setVideoError] = React.useState(false)
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay failed:', err)
        setVideoError(true)
      })
    }
  }, [])
  
  return (
    <section style={{
      position: 'relative',
      height: isMobile ? '74vh' : '88vh',
      minHeight: isMobile ? 500 : 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Video Background or Fallback Image */}
      {!videoError ? (
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? '62% center' : 'center',
            filter: 'brightness(0.9) contrast(1.05) saturate(1.1)',
            zIndex: 0
          }}
        >
          <source src="https://cdn.coverr.co/videos/coverr-luxury-car-driving-through-city-at-night-5273/1080p.mp4" type="video/mp4" />
        </motion.video>
      ) : (
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url(${IMAGES.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? '62% center' : 'center',
          filter: 'brightness(0.9) contrast(1.05) saturate(1.08)',
          zIndex: 0
        }}></motion.div>
      )}
      
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(115deg, rgba(0,0,0,0.45) 0%, rgba(16,24,40,0.52) 48%, rgba(0,0,0,0.62) 100%)',
        zIndex: 1
      }}></div>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 68% 22%, rgba(255,255,255,0.1), rgba(255,255,255,0) 42%), radial-gradient(circle at 50% 90%, rgba(227,6,19,0.1), rgba(227,6,19,0) 55%)',
        zIndex: 1
      }}></div>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 24%, rgba(0,0,0,0.2) 100%)',
        zIndex: 1
      }}></div>
      
      <div style={{
        maxWidth: 1400,
        width: '100%',
        padding: isMobile ? '0 20px' : '0 64px',
        textAlign: 'center',
        zIndex: 2
      }}>
        <motion.div
          variants={heading}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.18, duration: 0.6 }}
        >
          <div style={{
            maxWidth: isMobile ? '100%' : 900,
            margin: '0 auto',
            padding: isMobile ? '16px 14px' : '28px 28px',
            borderRadius: isMobile ? 14 : 18,
            background: 'linear-gradient(145deg, rgba(0,0,0,0.46), rgba(0,0,0,0.22))',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 18px 44px rgba(0,0,0,0.38)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderRadius: 999,
              padding: isMobile ? '6px 12px' : '7px 14px',
              marginBottom: isMobile ? 12 : 16,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.24)',
              color: '#ffffff',
              fontSize: isMobile ? 11 : 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700
            }}>
              Private Mobility Collection
            </div>
            <motion.h1 style={{
              fontSize: isMobile ? 31 : 62,
              fontWeight: 900,
              lineHeight: isMobile ? 1.18 : 1.06,
              marginBottom: isMobile ? 14 : 18,
              textShadow: '0 6px 26px rgba(0,0,0,0.85), 0 2px 10px rgba(0,0,0,0.8)',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              Luxury Mobility, <span style={{
                background: 'linear-gradient(90deg, #E30613, #ff4444)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: 'none'
              }}>Curated for Leaders</span>
            </motion.h1>
          </div>
        </motion.div>

        <motion.p
          variants={heading}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.32, duration: 0.6 }}
          style={{
            fontSize: isMobile ? 15 : 20,
            color: 'rgba(255,255,255,0.95)',
            marginBottom: isMobile ? 24 : 32,
            maxWidth: isMobile ? 560 : 760,
            margin: isMobile ? '12px auto 24px' : '16px auto 34px',
            textShadow: '0 4px 18px rgba(0,0,0,0.9)',
            fontWeight: 500,
            lineHeight: isMobile ? 1.55 : 1.7
          }}
        >
          Bespoke engineering, white-glove delivery, and silent electric performance — reserved for executives who expect absolute excellence.
        </motion.p>

        {/* Feature Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: isMobile ? 10 : 24,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: isMobile ? 28 : 40
          }}
        >
          <div style={{
            padding: isMobile ? '11px 14px' : '14px 20px',
            background: 'rgba(0,0,0,0.58)',
            backdropFilter: 'blur(20px)',
            borderRadius: isMobile ? 11 : 14,
            border: '1px solid rgba(255,255,255,0.24)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}>
            <div style={{ fontSize: isMobile ? 19 : 22, fontWeight: 800, color: '#f4d56f', marginBottom: 3, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              370 mi
            </div>
            <div style={{ fontSize: isMobile ? 10 : 11, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.9, fontWeight: 600 }}>
              Elite Range
            </div>
          </div>
          <div style={{
            padding: isMobile ? '11px 14px' : '14px 20px',
            background: 'rgba(0,0,0,0.58)',
            backdropFilter: 'blur(20px)',
            borderRadius: isMobile ? 11 : 14,
            border: '1px solid rgba(255,255,255,0.24)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}>
            <div style={{ fontSize: isMobile ? 19 : 22, fontWeight: 800, color: '#f4d56f', marginBottom: 3, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              3.1s
            </div>
            <div style={{ fontSize: isMobile ? 10 : 11, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.9, fontWeight: 600 }}>
              Signature Launch
            </div>
          </div>
          <div style={{
            padding: isMobile ? '11px 14px' : '14px 20px',
            background: 'rgba(212, 178, 106, 0.28)',
            backdropFilter: 'blur(20px)',
            borderRadius: isMobile ? 11 : 14,
            border: '1px solid rgba(212, 178, 106, 0.45)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}>
            <div style={{ fontSize: isMobile ? 19 : 22, fontWeight: 800, color: '#f4d56f', marginBottom: 3, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Advanced
            </div>
            <div style={{ fontSize: isMobile ? 10 : 11, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.9, fontWeight: 600 }}>
              Concierge Support
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 10 : 14,
            justifyContent: 'center',
            alignItems: isMobile ? 'stretch' : 'center',
            marginTop: isMobile ? 24 : 36,
            padding: isMobile ? '0 20px' : 0
          }}
        >
          <button
            className="primary"
            onClick={() => navigate('/models')}
            style={{
              padding: isMobile ? '13px 24px' : '15px 30px',
              fontSize: isMobile ? 14 : 15,
              fontWeight: 700,
              borderRadius: 999,
              background: 'linear-gradient(90deg, var(--accent), #ff4444)',
              border: 0,
              cursor: 'pointer',
              letterSpacing: '0.01em',
              boxShadow: '0 10px 28px rgba(184, 144, 51, 0.38)'
            }}
          >
            Explore Collection
          </button>
          <button
            onClick={() => navigate('/contact')}
            style={{
              padding: isMobile ? '13px 24px' : '15px 30px',
              fontSize: isMobile ? 14 : 15,
              fontWeight: 700,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.38)',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            Reserve a Consultation
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 24,
            color: 'rgba(255,255,255,0.6)'
          }}
        >
          ↓
        </motion.div>
      )}

      <svg className="hero-deco" width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#E30613" />
            <stop offset="100%" stopColor="#ff4444" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="110" r="90" stroke="url(#g1)" strokeWidth="6" opacity="0.18" />
      </svg>
    </section>
  )
}
