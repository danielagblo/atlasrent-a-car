import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'

export default function BlogPage() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const articles = [
    { title: 'The Future of Executive Travel in Ghana', date: 'April 12, 2024', category: 'Luxury Travel' },
    { title: 'Selecting the Perfect Fleet for Corporate Events', date: 'April 05, 2024', category: 'Logistics' },
    { title: 'Why Professional Chauffeurs are a Business Necessity', date: 'March 28, 2024', category: 'Service' }
  ]

  return (
    <Layout>
      <section style={{ padding: isMobile ? '120px 24px' : '160px 64px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ color: 'var(--accent-gold)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Latest Insights</div>
          <h1 style={{ fontSize: isMobile ? 40 : 56, fontWeight: 900, color: 'var(--accent)', marginBottom: 48 }}>The Atlas <span className="gradient-text">Journal</span></h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
            {articles.map((a, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: 32, border: '1px solid #f1f5f9', borderRadius: 24, background: '#fff' }}
              >
                <div style={{ fontSize: 12, color: 'var(--accent-gold)', fontWeight: 800, marginBottom: 12 }}>{a.category}</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: 'var(--accent)' }}>{a.title}</h3>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{a.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
