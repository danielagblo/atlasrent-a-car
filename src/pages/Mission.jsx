import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Mission(){
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section style={{padding: isMobile ? '40px 20px' : '80px 60px', maxWidth: 1200, margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: isMobile ? 40 : 60}}>
        <h2 style={{fontSize: isMobile ? 28 : 42, marginBottom: 16}}>Vision & Mission</h2>
        <p style={{color:'var(--muted)', fontSize: isMobile ? 16 : 18, maxWidth: 800, margin: '0 auto'}}>
          Our commitment to excellence drives everything we do.
        </p>
      </div>

      {/* Vision */}
      <div style={{padding: 40, background: 'linear-gradient(135deg, rgba(184, 144, 51, 0.15), rgba(212, 178, 106, 0.15))', borderRadius: 20, border: '1px solid rgba(212, 178, 106, 0.3)', marginBottom: 40}}>
        <div style={{fontSize: 48, marginBottom: 20, textAlign: 'center'}}>🎯</div>
        <h3 style={{fontSize: 28, marginBottom: 16, textAlign: 'center'}}>Our Vision</h3>
        <p style={{color:'var(--text)', fontSize: 18, textAlign: 'center', lineHeight: 1.7, fontWeight: 500}}>
          To be the leading car rental, travel and tour company providing efficient and effective services to our cherished clients across the subregion.
        </p>
      </div>

      {/* Mission */}
      <div style={{padding: 40, background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 60}}>
        <div style={{fontSize: 48, marginBottom: 20, textAlign: 'center'}}>🚀</div>
        <h3 style={{fontSize: 28, marginBottom: 16, textAlign: 'center'}}>Our Mission</h3>
        <p style={{color:'var(--text)', fontSize: 18, textAlign: 'center', lineHeight: 1.7, fontWeight: 500}}>
          We are seeking excellence in service and will provide quality service at cost that will enable us to remain competitive.
        </p>
      </div>

      {/* Core Values */}
      <h3 style={{fontSize: isMobile ? 24 : 32, marginBottom: isMobile ? 24 : 32, textAlign: 'center'}}>Core Values</h3>
      <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 20 : 28}}>
        <motion.div 
          whileHover={{y: -6}}
          style={{background:'rgba(255,255,255,0.03)', padding: 32, borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)'}}
        >
          <div style={{fontSize: 40, marginBottom: 16}}>🎯</div>
          <h3 style={{fontSize: 24, marginBottom: 12}}>Reliable</h3>
          <p style={{color:'var(--muted)', lineHeight: 1.7, fontSize: 15}}>
            Anywhere you are at whatever time, EKG can get you what you want in cars. Count on us for dependable service whenever you need it.
          </p>
        </motion.div>
        
        <motion.div 
          whileHover={{y: -6}}
          style={{background:'rgba(255,255,255,0.03)', padding: 32, borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)'}}
        >
          <div style={{fontSize: 40, marginBottom: 16}}>🛡️</div>
          <h3 style={{fontSize: 24, marginBottom: 12}}>Health & Safety</h3>
          <p style={{color:'var(--muted)', lineHeight: 1.7, fontSize: 15}}>
            The health and safety of our clients is our utmost concern. We ensure that all vehicles and equipment are in industry acceptable working conditions for safe use.
          </p>
        </motion.div>
      </div>

      {/* Safety Features */}
      <div style={{marginTop: 60, padding: 40, background: 'rgba(255,255,255,0.02)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)'}}>
        <h3 style={{fontSize: 28, marginBottom: 24, textAlign: 'center'}}>Safety & Quality Standards</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20}}>
          <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
            <span style={{fontSize: 20, color: 'var(--accent)'}}>✓</span>
            <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Fully air-conditioned cars with spare tyres, first aid kit, jack, tool box and fire extinguishers</p>
          </div>
          <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
            <span style={{fontSize: 20, color: 'var(--accent)'}}>✓</span>
            <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>All vehicles comprehensively insured for your peace of mind</p>
          </div>
          <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
            <span style={{fontSize: 20, color: 'var(--accent)'}}>✓</span>
            <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Well maintained cars from reputable workshops</p>
          </div>
          <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
            <span style={{fontSize: 20, color: 'var(--accent)'}}>✓</span>
            <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>All locally required licenses and certifications are up to date</p>
          </div>
          <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
            <span style={{fontSize: 20, color: 'var(--accent)'}}>✓</span>
            <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Rigorous driver training and continuous professional development</p>
          </div>
          <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
            <span style={{fontSize: 20, color: 'var(--accent)'}}>✓</span>
            <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>24-hour monitored tracking device installed in all vehicles</p>
          </div>
        </div>
      </div>
    </section>
  )
}
