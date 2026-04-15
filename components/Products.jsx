import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import Link from 'next/link'
import { CheckCircle2, ChevronRight, Play } from 'lucide-react'

const CATEGORIES = ['Business Cars', 'Economic Cars', 'Luxury Cars', 'Premium Cars']

const DUMMY_FLEET = [
  {
    id: 'd1',
    name: 'Mercedes-Benz S-Class',
    category: 'Premium Cars',
    price: '2500',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1200'
    ],
    desc: 'The pinnacle of luxury and technology.',
    features: ['Fuel Petrol / 3.0L V6 Engine', 'Under 5,000 Km', 'Full Service History', 'Manufacturing Year 2023', 'Adaptive Suspension', 'Transmission Automatic']
  },
  {
    id: 'd2',
    name: 'Range Rover Autobiography',
    category: 'Luxury Cars',
    price: '3000',
    image: 'https://images.unsplash.com/photo-1606148633266-06432b8966ba?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1606148633266-06432b8966ba?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200'
    ],
    desc: 'Peerless capability with refined luxury.',
    features: ['Fuel Diesel / 4.4L V8 Engine', 'Under 10,000 Km', 'Panoramic Sunroof', 'Manufacturing Year 2024', 'Terrain Response 2', 'Transmission Automatic']
  },
  {
    id: 'd3',
    name: 'BMW 7 Series',
    category: 'Business Cars',
    price: '2200',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200'
    ],
    desc: 'Forward-thinking design and dynamic performance.',
    features: ['Fuel Petrol / 3.0L I6 Engine', 'Under 15,000 Km', 'Business Package', 'Manufacturing Year 2023', 'Harmon Kardon Sound', 'Transmission Automatic']
  },
  {
    id: 'd4',
    name: 'Toyota Camry',
    category: 'Economic Cars',
    price: '900',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=1200',
    gallery: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=1200'],
    desc: 'Reliability and comfort for everyday travel.',
    features: ['Fuel Petrol / 2.5L Engine', 'Under 25,000 Km', '5 Year service included', 'Manufacturing Year 2022', '5 Doors and Spacious View', 'Transmission Automatic']
  },
  {
    id: 'd5',
    name: 'Toyota Corolla',
    category: 'Economic Cars',
    price: '750',
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=1200',
    gallery: ['https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=1200'],
    desc: 'Efficiency meets modern styling.',
    features: ['Fuel Petrol / 1.8L Engine', 'Under 30,000 Km', 'Maintenance package', 'Manufacturing Year 2021', 'Standard safety sense', 'Transmission Automatic']
  }
]

function ProfessionalShowcase({ items }) {
  const [activeCategory, setActiveCategory] = useState('Economic Cars')
  const [activeModelId, setActiveModelId] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const categoryItems = items.filter(item => item.category === activeCategory)
  
  useEffect(() => {
    if (categoryItems.length > 0) {
      if (!activeModelId || !categoryItems.find(i => i.id === activeModelId)) {
        setActiveModelId(categoryItems[0].id)
        setActiveImageIndex(0)
      }
    }
  }, [activeCategory, categoryItems, activeModelId])

  const currentItem = categoryItems.find(i => i.id === activeModelId) || categoryItems[0]
  const gallery = currentItem?.gallery || [currentItem?.image]

  const nextImage = (e) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  if (!currentItem) return null

  return (
    <section style={{ 
      padding: isMobile ? '80px 20px' : '150px 0', 
      background: '#fff',
      borderTop: '1px solid #f1f5f9'
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0' : '0 64px' }}>
        
        {/* Modern Minimal Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: isMobile ? 'flex-start' : 'space-between', 
          alignItems: 'center',
          marginBottom: 80,
          borderBottom: '1px solid #f1f5f9',
          overflowX: isMobile ? 'auto' : 'visible',
          gap: isMobile ? 24 : 0
        }}>
          <div style={{ display: 'flex', gap: 40 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setActiveImageIndex(0)
                }}
                style={{
                  padding: '24px 0',
                  border: 'none',
                  background: 'none',
                  color: activeCategory === cat ? 'var(--accent)' : 'var(--text-muted)',
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: '0.3s'
                }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeTab"
                    style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: 'var(--accent-gold)' }} 
                  />
                )}
              </button>
            ))}
          </div>
          {!isMobile && (
            <div style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 500 }}>
              Showing {categoryItems.length} vehicles in {activeCategory}
            </div>
          )}
        </div>

        {/* Minimal Main Area */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '300px 1fr 350px', gap: 64, alignItems: 'start' }}>
          
          {/* Column 1: Model List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Select Model</div>
            {categoryItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModelId(item.id)
                  setActiveImageIndex(0)
                }}
                style={{
                  padding: '16px 0',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  color: activeModelId === item.id ? 'var(--accent)' : '#94a3b8',
                  fontSize: 18,
                  fontWeight: activeModelId === item.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: '0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                {activeModelId === item.id && <div style={{ width: 12, height: 2, background: 'var(--accent-gold)' }} />}
                {item.name}
              </button>
            ))}
          </div>

          {/* Column 2: The Vehicle Image Gallery */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id + activeImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={gallery[activeImageIndex]}
                    alt={currentItem.name}
                    style={{ width: '100%', maxHeight: 450, objectFit: 'contain' }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {gallery.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #f1f5f9', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', zIndex: 2 }}
                  >
                    <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button 
                    onClick={nextImage}
                    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #f1f5f9', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', zIndex: 2 }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div style={{ marginTop: 40 }}>
               <h3 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, color: 'var(--accent)' }}>{currentItem.name}</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 24 }}>{currentItem.desc}</p>
               
               {/* Gallery Thumbnails */}
               {gallery.length > 1 && (
                 <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                   {gallery.map((img, idx) => (
                     <button 
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        style={{ padding: 0, border: activeImageIndex === idx ? '2px solid var(--accent-gold)' : '1px solid #f1f5f9', background: 'none', cursor: 'pointer', borderRadius: 8, overflow: 'hidden', width: 60, height: 40 }}
                     >
                       <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     </button>
                   ))}
                 </div>
               )}
            </div>
          </div>

          {/* Column 3: Specs & CTA */}
          <div style={{ 
            background: '#f8fafc', 
            borderRadius: '24px', 
            padding: '40px',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Daily Rate</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 44, fontWeight: 900, color: 'var(--accent)' }}>₵{currentItem.price || currentItem.rate}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>/ day</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 40 }}>
              {(currentItem.features || []).slice(0, 4).map((f, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-gold)' }} />
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>{f}</div>
                </div>
              ))}
            </div>

            <Link href={`/order/${currentItem.id}`} style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                padding: '20px',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: 14,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: '0.3s'
              }}>
                Book Now
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
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
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.filter(i => i.status !== 'inactive'))
        } else {
          setItems(DUMMY_FLEET)
        }
      })
      .catch(e => {
        console.error('Failed to load fleet, using dummy data', e)
        setItems(DUMMY_FLEET)
      })
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
    return <ProfessionalShowcase items={items} />
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
