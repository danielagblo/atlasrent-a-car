
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import IMAGES from '../data/images'
import { getModelsWithFallback } from '../lib/modelsApi'

const container = {
  show: { transition: { staggerChildren: 0.06 } }
}

export default function Products(){
  const [models, setModels] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await getModelsWithFallback()
      if (mounted) setModels(data)
    })()
    return () => { mounted = false }
  }, [])

  const categories = useMemo(()=>['All', ...Array.from(new Set(models.map(m=>m.category).filter(Boolean)))] , [models])
  const visible = useMemo(()=> filter === 'All' ? models : models.filter(m=>m.category === filter), [filter, models])

  return (
    <section className="products">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:20}}>
        <div>
          <h2>Our Lineup</h2>
          <div className="product-intro">Luxury vehicles engineered for performance, comfort, and sustainability.</div>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <div style={{color:'var(--muted)',fontSize:14}}>Showing {visible.length} models</div>
        </div>
      </div>

      <div className="featured-strip" style={{marginTop:18,display:'flex',gap:12,overflowX:'auto',paddingBottom:8}}>
        {models.slice(0,3).map((m, i) => {
          const featuredImages = [IMAGES.featured1, IMAGES.featured2, IMAGES.featured3]
          return (
            <div key={m.id} className="featured-card" style={{minWidth:300,display:'flex',gap:12,alignItems:'center',background:'var(--surface)',padding:12,borderRadius:12,boxShadow:'var(--shadow)'}}>
              <img src={featuredImages[i]} alt={m.name} style={{width:140,height:88,objectFit:'cover',borderRadius:8}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:800}}>{m.name}</div>
                <div style={{color:'var(--muted)',fontSize:13}}>{m.desc}</div>
                <div style={{marginTop:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontWeight:800,color:'var(--accent-2)'}}>{m.rate}</div>
                  <button className="small" onClick={() => window.location.href = `/order/${m.id}`} style={{background:'linear-gradient(90deg,var(--accent),#ff4444)',color:'#fff',border:0,fontWeight:700,padding:'8px 16px',boxShadow:'0 2px 8px rgba(184, 144, 51, 0.3)',cursor:'pointer'}}>Book Now</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{marginTop:18,display:'flex',gap:10,alignItems:'center'}} className="filters">
        {categories.map(cat => (
          <button key={cat} className={`small ${filter===cat? 'active':''}`} onClick={()=>setFilter(cat)}>{cat}</button>
        ))}
      </div>

      <motion.div className="product-grid" variants={container} initial="hidden" animate="show">
        {visible.map(item => (
          <motion.div key={item.id} layout initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
            <ProductCard item={item} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
