import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import IMAGES from '../data/images'
import Link from 'next/link'
const Search = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
)
const Filter = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
)
const XIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18M6 6l12 12" /></svg>
)

const CATEGORIES = ['All', 'Luxury', 'Executive', 'Sport', 'Economy', 'Cargo/Utility', 'Motorcycle']

export default function Products({ limit }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
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
    const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.desc?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  })

  const displayedItems = limit ? items.slice(0, limit) : filteredItems

  if (loading) {
    return (
      <section style={{ padding: '100px 20px', maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>Loading fleet...</p>
      </section>
    )
  }

  return (
    <section style={{ padding: limit ? '80px 20px' : '40px 20px 100px', maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ textAlign: limit ? 'center' : 'left', marginBottom: 48 }}>
        <h2 style={{ fontSize: isMobile ? 32 : 42, color: 'var(--text)', marginBottom: 16 }}>{limit ? 'The Fleet' : 'Our Professional Fleet'}</h2>
        <p style={{ color: 'var(--muted)', fontSize: 18 }}>{limit ? 'Explore our curated collection of executive vehicles' : 'A diverse range of logistics and executive solutions tailored for your success.'}</p>
      </div>

      {!limit && (
        <div style={{ marginBottom: 40, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', width: isMobile ? '100%' : '100%', maxWidth: 400 }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder="Search by name, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                borderRadius: 12,
                padding: '12px 16px 12px 48px',
                color: 'var(--text)',
                outline: 'none',
                fontSize: 15
              }}
            />
            {search && <XIcon size={16} onClick={() => setSearch('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', cursor: 'pointer' }} />}
          </div>

          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', width: isMobile ? '100%' : 'auto', paddingBottom: isMobile ? 10 : 0, WebkitOverflowScrolling: 'touch' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 99,
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--accent-2)' : 'var(--glass-border)',
                  background: selectedCategory === cat ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                  color: selectedCategory === cat ? 'var(--accent-2)' : 'var(--muted)',
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredItems.length === 0 && !limit ? (
        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--glass)', borderRadius: 24, border: '1px dashed var(--glass-border)' }}>
          <Filter size={48} style={{ color: 'var(--muted)', opacity: 0.3, marginBottom: 20 }} />
          <h3 style={{ color: 'var(--text)', fontSize: 20, marginBottom: 8 }}>No vehicles found</h3>
          <p style={{ color: 'var(--muted)' }}>Try adjusting your search or category filters.</p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('All') }}
            style={{ marginTop: 20, background: 'none', border: 'none', color: '#D4AF37', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 24 }}>
          {displayedItems.map(i => <ProductCard key={i.id} item={i} />)}
        </div>
      )}

      {limit && items.length > limit && (
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link
            href="/models"
            style={{
              display: 'inline-flex',
              padding: '16px 40px',
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: 999,
              color: '#D4AF37',
              fontSize: 14,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'; e.currentTarget.style.borderColor = '#D4AF37' }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)' }}>

            View Full Fleet

          </Link>
        </div>
      )}
    </section>
  );
}
