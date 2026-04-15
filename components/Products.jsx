import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CATEGORIES = ['Business Cars', 'Economic Cars', 'Luxury Cars', 'Premium Cars']
const ALL_CATEGORIES = ['All', ...CATEGORIES]

export default function Products({ limit }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setItems(data.filter(i => i.status !== 'inactive'))
        }
      })
      .catch(e => console.error('Failed to load fleet', e))
      .finally(() => setLoading(false))
  }, [])

  const filteredItems = items
    .filter(item => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return parseFloat(a.price || a.rate) - parseFloat(b.price || b.rate)
      if (sortBy === 'price-high') return parseFloat(b.price || b.rate) - parseFloat(a.price || a.rate)
      return 0
    })

  const displayedItems = limit ? items.slice(0, limit) : filteredItems

  if (loading) {
    return (
      <section style={{ textAlign: 'center', padding: '100px 0' }}>
        <p style={{ color: 'var(--text-muted)' }}>Preparing the collection...</p>
      </section>
    )
  }

  return (
    <section className="fleet-section" style={{ background: '#fff', padding: limit ? '100px 0' : '150px 0 100px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 24px' : '0 48px' }}>
        
        {/* Simple Editorial Header for Homepage */}
        {limit && (
           <div style={{ display: 'flex', gap: 40, alignItems: 'center', marginBottom: 60 }}>
              <div style={{ width: 4, height: 80, background: 'var(--accent-gold)' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 16 }}>Elite Showcase</div>
                <h2 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1.1, margin: 0 }}>
                  The Atlas <br/> <span style={{ color: 'var(--accent-gold)' }}>Vehicles.</span>
                </h2>
              </div>
           </div>
        )}

        {/* Filters shown only on main vehicles page (no limit) */}
        {!limit && (
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'stretch' : 'center', 
            gap: 24,
            marginBottom: 48
          }}>
            <div className="no-scrollbar" style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 8 }}>
              {ALL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 0',
                    color: selectedCategory === cat ? 'var(--accent)' : 'var(--text-muted)',
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    position: 'relative',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat}
                  {selectedCategory === cat && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--accent-gold)' }} />}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Search vehicles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 14, width: isMobile ? '100%' : '240px', outline: 'none' }}
              />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: 14, background: '#fff', outline: 'none', cursor: 'pointer' }}
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}

        {!limit && (
          <div style={{ marginBottom: 32, fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
            {filteredItems.length} vehicles found matching your criteria.
          </div>
        )}

        {displayedItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 20px', border: '1px dashed #e2e8f0', borderRadius: 16 }}>
            <h3 style={{ fontSize: 24, marginBottom: 8 }}>No vehicles found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="product-grid" style={{ padding: '0 0 60px' }}>
            {displayedItems.map(i => <ProductCard key={i.id} item={i} />)}
          </div>
        )}

        {limit && (
           <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/vehicles">
                 <button style={{ 
                   padding: '18px 48px', 
                   background: 'var(--accent)', 
                   color: '#fff', 
                   borderRadius: 999, 
                   border: 'none', 
                   fontWeight: 800, 
                   cursor: 'pointer', 
                   display: 'inline-flex', 
                   alignItems: 'center', 
                   gap: 12,
                   fontSize: 14,
                   textTransform: 'uppercase',
                   letterSpacing: '0.1em'
                 }}>
                   Explore Full Collection <ArrowRight size={18} color="var(--accent-gold)" />
                 </button>
              </Link>
           </div>
        )}
      </div>
    </section>
  )
}
