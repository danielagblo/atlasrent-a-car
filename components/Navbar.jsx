import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <motion.header className="nav" initial={{ y: -40, opacity: 0 }} animate={{ y:0, opacity:1 }} transition={{ duration: .45 }}>
      <Link href="/" legacyBehavior><a style={{ textDecoration: 'none', color: 'inherit' }}>
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
      </a></Link>

      <nav style={{display:'flex',alignItems:'center'}}>
        <div className="links" aria-hidden={open}>
          <Link href="/" legacyBehavior><a className={router.pathname === '/' ? 'active' : ''}>Home</a></Link>
          <Link href="/about" legacyBehavior><a className={router.pathname === '/about' ? 'active' : ''}>About</a></Link>
          <Link href="/models" legacyBehavior><a className={router.pathname === '/models' ? 'active' : ''}>Fleet</a></Link>
          <Link href="/mission" legacyBehavior><a className={router.pathname === '/mission' ? 'active' : ''}>Mission</a></Link>
          
          <Link href="/contact" legacyBehavior><a className="cta">Contact</a></Link>
        </div>

        <button className="nav-toggle" aria-expanded={open} onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">☰</button>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
            <Link href="/" legacyBehavior><a onClick={()=>setOpen(false)}>Home</a></Link>
            <Link href="/models" legacyBehavior><a onClick={()=>setOpen(false)}>Models</a></Link>
            <Link href="/about" legacyBehavior><a onClick={()=>setOpen(false)}>About</a></Link>
            
            <Link href="/contact" legacyBehavior><a onClick={()=>setOpen(false)} className="cta">Contact</a></Link>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
