import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'

export default function FAQPage() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const faqs = [
    { q: 'How do I book a vehicle?', a: 'You can browse our fleet in the "Vehicles" section and click "Book Now" to fill in the rental form.' },
    { q: 'Is Chauffeur service included?', a: 'All our executive rentals come with a professionally trained chauffeur as part of the service.' },
    { q: 'What is your fuel policy?', a: 'Vehicles are provided with a certain level of fuel; clients are expected to signing log sheets and verify fuel levels daily.' }
  ]

  return (
    <Layout>
      <section style={{ padding: isMobile ? '120px 24px' : '160px 64px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Client Services</div>
          <h1 style={{ fontSize: isMobile ? 40 : 56, fontWeight: 900, color: 'var(--accent)', marginBottom: 48 }}>Common <span className="gradient-text">Questions</span></h1>
          
          <div style={{ display: 'grid', gap: 24 }}>
            {faqs.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: 32, border: '1px solid #f1f5f9', borderRadius: 24 }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, color: 'var(--accent)' }}>{f.q}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
