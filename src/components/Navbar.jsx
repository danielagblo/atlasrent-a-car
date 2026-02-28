import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

export default function Navbar(){
  const [open, setOpen] = useState(false)

  return (
    <motion.header className="nav" initial={{ y: -40, opacity: 0 }} animate={{ y:0, opacity:1 }} transition={{ duration: .45 }}>
      <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <img
            src="/logo-transparent.png"
            alt="EKG Logistics and transport"
            style={{
              width:64,
              height:64,
              objectFit:'contain',
              background:'transparent',
              display:'block',
              transform:'scale(1.6)',
              transformOrigin:'center center'
            }}
          />
          <div>
            <div className="brand">EKG<span>Logistics and transport</span></div>
            <div style={{color:'var(--muted)',fontSize:12,lineHeight:1}}>Luxury Electric Vehicles</div>
          </div>
        </div>
      </NavLink>

      <nav style={{display:'flex',alignItems:'center'}}>
        <div className="links" aria-hidden={open}>
          <NavLink to="/" className={({isActive})=> isActive? 'active':''}>Home</NavLink>
          <NavLink to="/about" className={({isActive})=> isActive? 'active':''}>About</NavLink>
          <NavLink to="/models" className={({isActive})=> isActive? 'active':''}>Fleet</NavLink>
          <NavLink to="/mission" className={({isActive})=> isActive? 'active':''}>Mission</NavLink>
          <NavLink to="/orders" className={({isActive})=> isActive? 'active':''}>Orders</NavLink>
          <NavLink to="/admin" className={({isActive})=> isActive? 'active':''}>Admin</NavLink>
          <NavLink to="/contact" className="cta">Contact</NavLink>
        </div>

        <button className="nav-toggle" aria-expanded={open} onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">☰</button>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
            <NavLink to="/" onClick={()=>setOpen(false)}>Home</NavLink>
            <NavLink to="/models" onClick={()=>setOpen(false)}>Models</NavLink>
            <NavLink to="/about" onClick={()=>setOpen(false)}>About</NavLink>
            <NavLink to="/admin" onClick={()=>setOpen(false)}>Admin</NavLink>
            <NavLink to="/contact" onClick={()=>setOpen(false)} className="cta">Contact</NavLink>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
