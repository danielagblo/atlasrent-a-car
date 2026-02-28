
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ProductModal from './ProductModal'
import IMAGES from '../data/images'

export default function ProductCard({ item }){
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  // Fallback to curated images if local asset is missing
  const fallbackImages = {
    lux: IMAGES.featured1,
    sport: IMAGES.featured2,
    tour: IMAGES.featured3
  }
  const imgSrc = item.localImage || fallbackImages[item.id] || item.image
  return (
    <>
      <motion.article 
        className="card" 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }} 
        whileHover={{ translateY: -6 }} 
        transition={{ type: 'spring', stiffness: 220 }}
        onClick={() => navigate(`/order/${item.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <div className="thumb" style={{position:'relative'}}>
          <img className="card-img" src={imgSrc} alt={item.name} loading="lazy" decoding="async" onError={(e)=>{ e.target.onerror=null; e.target.src=item.image }} />
          <div style={{position:'absolute',left:12,top:12,background:'rgba(0,0,0,0.55)',color:'#fff',padding:'6px 10px',borderRadius:999,fontWeight:700,fontSize:13}}> {item.range}</div>
        </div>
        <div className="card-body">
          <h3 style={{marginBottom:8}}>{item.name}</h3>
          <p style={{color:'var(--muted)',margin:0,fontSize:14,lineHeight:1.45}}>{item.desc}</p>
          <div className="card-footer">
            <div>
              <div style={{fontWeight:800,color:'var(--accent-2)',fontSize:16}}>{item.rate || item.price}</div>
              <div style={{color:'var(--muted)',fontSize:13,marginTop:6}}>
                <span style={{marginRight:12}}>🚗 {item.specs?.seats || '-'} seats</span>
                <span>⚡ {item.range}</span>
              </div>
            </div>
            <div style={{
              padding:'10px 20px',
              background:'linear-gradient(135deg,#E30613,#ff4444)',
              color:'#fff',
              borderRadius:8,
              fontWeight:700,
              fontSize:14,
              boxShadow:'0 3px 10px rgba(184, 144, 51, 0.4)'
            }}>Book Now</div>
          </div>
        </div>
      </motion.article>
      {open && <ProductModal item={item} onClose={()=>setOpen(false)} />}
    </>
  )
}
