import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import Link from 'next/link'

const CATEGORIES = ['All', 'Business Cars', 'Economic Cars', 'Luxury Cars', 'Premium Cars']

function ProfessionalShowcase({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!items || items.length === 0) return null
  const currentItem = items[currentIndex]

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto 80px', padding: '0 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <h2 style={{ fontSize: 44, fontWeight: 800, marginBottom: 12 }}>Unveiling Excellence</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 500 }}>
            Our handpicked selection of top-tier vehicles, rigorously maintained for your ultimate comfort and safety.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={prev} style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={next} style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid #000', background: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div style={{ 
        background: '#f8fafc', 
        borderRadius: 32, 
        padding: '64px',
        border: '1px solid #e2e8f0',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: 64,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, fontSize: 14 }}>
            {currentItem.category || 'Featured Vehicle'}
          </div>
          <AnimatePresence mode="wait">
            <motion.h3 
              key={currentItem.id + "-title"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ fontSize: 56, fontWeight: 900, marginBottom: 24, lineHeight: 1.1 }}
            >
              {currentItem.name}
            </motion.h3>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentItem.id + "-desc"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1.6, marginBottom: 40 }}
            >
              {currentItem.desc || "Experience a seamless blend of luxury and performance. This vehicle guarantees a memorable journey with state-of-the-art features."}
            </motion.p>
          </AnimatePresence>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48, borderTop: '1px solid #e2e8f0', paddingTop: 32 }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Daily Rate</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>{currentItem.price || currentItem.rate} GHS</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Transmission</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{currentItem.specs?.transmission || 'Automatic'}</div>
            </div>
          </div>

          <Link href={`/order/${currentItem.id}`}>
            <span className="btn-premium" style={{ display: 'inline-block' }}>Secure this Vehicle</span>
          </Link>
        </div>

        <div style={{ position: 'relative', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(34,167,240,0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentItem.id + "-img"}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -100 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              src={currentItem.image}
              alt={currentItem.name}
              style={{ width: '120%', maxWidth: 800, objectFit: 'contain', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function Products({ limit }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    fetch('/api/models')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setItems(data.filter(i => i.status !== 'inactive'))
        }
      })
      .catch(e => console.error('Failed to load fleet', e))
      .finally(() => setLoading(false))
  }, [])

  const filteredItems = items.filter(item => {
    return selectedCategory === 'All' || item.category === selectedCategory
  })

  const displayedItems = limit ? items.slice(0, limit) : filteredItems

  if (loading) {
    return (
      <section className="fleet-section" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Preparing the collection...</p>
      </section>
    )
  }

  // If this is the Homepage (limit prop is supplied), show the Professional Showcase
  if (limit) {
    return <ProfessionalShowcase items={displayedItems} />
  }

  // Otherwise, render the comprehensive Fleet grid
  return (
    <section className="fleet-section">
      <div className="section-header">
        <h2>The Complete Fleet</h2>
        <p>Browse our comprehensive range of high-end vehicles tailored for excellence.</p>
      </div>

      <div className="fleet-tabs" style={{ flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`fleet-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h3 style={{ fontSize: 24, marginBottom: 8 }}>No vehicles found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try selecting a different category.</p>
        </div>
      ) : (
        <div className="product-grid">
          {displayedItems.map(i => <ProductCard key={i.id} item={i} />)}
        </div>
      )}
    </section>
  );
}
