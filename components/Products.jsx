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
    <section className="collection-showcase" style={{ background: '#fff', padding: isMobile ? '64px 0' : '160px 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>
        
        {/* Heritage Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 60 : 100 }}>
           <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 800, color: '#DF9738', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 16 }}>The Sovereign Selection</div>
           <h2 style={{ 
             fontSize: isMobile ? 32 : 64, 
             fontWeight: 400, 
             color: '#24276F', 
             fontFamily: 'serif', 
             letterSpacing: '-0.02em',
             fontStyle: 'italic',
             lineHeight: 1.1
           }}>
             The Atlas <span style={{ color: '#000' }}>Collection.</span>
           </h2>
        </div>

        {/* Ghost Category Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 32 : 60,
          marginBottom: isMobile ? 40 : 100,
          borderBottom: '1px solid #f1f5f9',
          overflowX: isMobile ? 'auto' : 'visible',
          whiteSpace: 'nowrap',
          paddingBottom: isMobile ? 8 : 0
        }} className="no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: isMobile ? '16px 0' : '24px 0', background: 'none', border: 'none', cursor: 'pointer',
                color: activeCategory === cat ? '#24276F' : '#cbd5e1',
                fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em',
                transition: 'all 0.4s ease', position: 'relative',
                flexShrink: 0
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
          gap: isMobile ? 40 : 100,
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
                  <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
                    <motion.div
                      whileHover={{ x: [0, -40, 0] }}
                      transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    >
                      {item.name}
                    </motion.div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Cinematic Image Stage */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: isMobile ? 32 : 60, height: isMobile ? 240 : 400 }}>
              <AnimatePresence mode="wait">
                <motion.img 
                   key={`${activeVehicleId}-${activeImgIdx}`}
                   initial={{ opacity: 0, scale: 0.99, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                   src={gallery[activeImgIdx]} 
                   style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                />
              </AnimatePresence>
            </div>
            
            {/* Heritage Pagers */}
            {gallery.length > 1 && (
              <div style={{ display: 'flex', gap: 16 }}>
                {gallery.map((_, i) => (
                  <button 
                    key={i} onClick={() => setActiveImgIdx(i)}
                    style={{ 
                      width: isMobile ? 32 : 50, height: 2, padding: 0, cursor: 'pointer',
                      border: 'none', background: activeImgIdx === i ? '#DF9738' : '#e2e8f0',
                      transition: '0.6s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Detail Architecture */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            {isMobile && (
               <div style={{ fontSize: 24, fontWeight: 800, color: '#24276F', marginBottom: 12 }}>{current?.name}</div>
            )}
            <div style={{ marginBottom: isMobile ? 32 : 60 }}>
               <div style={{ 
                 fontSize: isMobile ? 36 : 56, 
                 fontWeight: 400, 
                 color: '#24276F', 
                 fontFamily: 'serif',
                 letterSpacing: '-0.02em',
                 marginBottom: 4
               }}>
                  <span style={{ fontSize: isMobile ? 20 : 24, verticalAlign: 'top', color: '#DF9738', marginRight: 4 }}>₵</span>
                  {current?.price || current?.rate}
               </div>
               <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Daily Sovereign Rate</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid #f8fafc', alignItems: isMobile ? 'center' : 'flex-start' }}>
              {(current?.features || []).slice(0, 4).map((feat, i) => (
                <div key={i} style={{ fontSize: 13, fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: 12 }}>
                   <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#DF9738' }} />
                   {feat}
                </div>
              ))}
            </div>

            <Link href={`/reservation/${current?.id}`}>
               <button style={{ 
                 width: '100%', padding: '20px', background: '#24276f', color: '#fff', 
                 border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 13, 
                 textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer',
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

export default function Products({ limit, isMobile: propIsMobile }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [internalIsMobile, setInternalIsMobile] = useState(false)

  const isMobile = propIsMobile !== undefined ? propIsMobile : internalIsMobile

  useEffect(() => {
    if (propIsMobile === undefined) {
      const handleResize = () => setInternalIsMobile(window.innerWidth <= 768)
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [propIsMobile])

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
     <section style={{ background: '#fff', padding: isMobile ? '40px 20px' : '120px 48px' }}>
       <div style={{ 
          maxWidth: 1440, 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: isMobile ? 32 : 48
       }}>
          {items.map(i => <ProductCard key={i.id} item={i} i={0} />)}
       </div>
     </section>
  )
}
