import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const CATEGORIES = ['Business Cars', 'Economic Cars', 'Luxury Cars', 'Premium Cars']

function HeritageShowcase({ items }) {
  const [activeCategory, setActiveCategory] = useState('Premium Cars')
  const [activeVehicleId, setActiveVehicleId] = useState(null)
  const [activeImgIdx, setActiveImgIdx] = useState(0)
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
      if (!activeVehicleId || !categoryItems.find(i => i.id === activeVehicleId)) {
        setActiveVehicleId(categoryItems[0].id)
        setActiveImgIdx(0)
      }
    }
  }, [activeCategory, categoryItems, activeVehicleId])

  const current = categoryItems.find(i => i.id === activeVehicleId) || categoryItems[0]
  const gallery = current?.gallery?.length > 0 ? current.gallery : [current?.image]

  return (
    <section className="collection-showcase" style={{ background: '#fff', padding: isMobile ? '60px 0' : '160px 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 24px' : '0 48px' }}>
        
        {/* Heritage Header */}
        <div style={{ textAlign: 'center', marginBottom: 100 }}>
           <div style={{ fontSize: 13, fontWeight: 800, color: '#DF9738', textTransform: 'uppercase', letterSpacing: '0.5em', marginBottom: 24 }}>The Sovereign Selection</div>
           <h2 style={{ 
             fontSize: isMobile ? 36 : 64, 
             fontWeight: 400, 
             color: '#24276F', 
             fontFamily: 'serif', 
             letterSpacing: '-0.02em',
             fontStyle: 'italic'
           }}>
             The Atlas <span style={{ color: '#000' }}>Collection.</span>
           </h2>
        </div>

        {/* Ghost Category Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: isMobile ? 20 : 60,
          marginBottom: 100,
          borderBottom: '1px solid #f1f5f9'
        }} className="no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer',
                color: activeCategory === cat ? '#24276F' : '#cbd5e1',
                fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em',
                transition: 'all 0.4s ease', position: 'relative'
              }}
            >
              {cat}
              {activeCategory === cat && <div style={{ position: 'absolute', bottom: -1, left: '50%', transform: 'translateX(-50%)', width: 40, height: 1, background: '#DF9738' }} />}
            </button>
          ))}
        </div>

        {/* Heritage Boutique Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '240px 1fr 300px', 
          gap: 100,
          alignItems: 'center'
        }}>
          
          {/* Sidebar: Lowercase & Spaced */}
          {!isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {categoryItems.map(item => (
                <button
                  key={item.id} onClick={() => setActiveVehicleId(item.id)}
                  style={{
                    textAlign: 'left', padding: '12px 0', cursor: 'pointer', border: 'none', background: 'none',
                    color: activeVehicleId === item.id ? '#24276F' : '#94a3b8',
                    fontSize: 15, fontWeight: 700,
                    transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', gap: 16
                  }}
                >
                  <div style={{ 
                    width: 6, height: 6, 
                    transform: 'rotate(45deg)', 
                    background: activeVehicleId === item.id ? '#DF9738' : 'transparent', 
                    transition: '0.4s' 
                  }} />
                  {item.name}
                </button>
              ))}
            </div>
          )}

          {/* Cinematic Image Stage */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 60 }}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={`${activeVehicleId}-${activeImgIdx}`}
                  initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  src={gallery[activeImgIdx]} 
                  style={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }} 
                />
              </AnimatePresence>
            </div>
            
            {/* Heritage Pagers */}
            {gallery.length > 1 && (
              <div style={{ display: 'flex', gap: 24 }}>
                {gallery.map((_, i) => (
                  <button 
                    key={i} onClick={() => setActiveImgIdx(i)}
                    style={{ 
                      width: 50, height: 1, padding: 0, cursor: 'pointer',
                      border: 'none', background: activeImgIdx === i ? '#DF9738' : '#e2e8f0',
                      transition: '0.6s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Detail Architecture */}
          <div>
            <div style={{ marginBottom: 60 }}>
               <div style={{ 
                 fontSize: 56, 
                 fontWeight: 400, 
                 color: '#24276F', 
                 fontFamily: 'serif',
                 letterSpacing: '-0.02em',
                 marginBottom: 8
               }}>
                  <span style={{ fontSize: 24, verticalAlign: 'top', color: '#DF9738', marginRight: 4 }}>₵</span>
                  {current?.price || current?.rate}
               </div>
               <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Daily Sovereign Rate</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 60, paddingBottom: 40, borderBottom: '1px solid #f8fafc' }}>
              {(current?.features || []).slice(0, 5).map((feat, i) => (
                <div key={i} style={{ fontSize: 13, fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: 14 }}>
                   <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#DF9738' }} />
                   {feat}
                </div>
              ))}
            </div>

            <Link href={`/vehicles/${current?.id}`}>
               <button style={{ 
                 width: '100%', padding: '24px', background: '#24276f', color: '#fff', 
                 border: 'none', borderRadius: 4, fontWeight: 800, fontSize: 13, 
                 textTransform: 'uppercase', letterSpacing: '0.3em', cursor: 'pointer',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                 boxShadow: '0 20px 40px rgba(36, 39, 111, 0.1)'
               }}>
                 RESERVE NOW <ChevronRight size={16} />
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

  if (loading) return null

  if (limit) {
    return <HeritageShowcase items={items} />
  }

  return (
     <section style={{ background: '#fff', padding: '120px 48px' }}>
       <div className="product-grid" style={{ maxWidth: 1440, margin: '0 auto' }}>
          {items.map(i => <ProductCard key={i.id} item={i} />)}
       </div>
     </section>
  )
}
