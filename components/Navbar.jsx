import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginTop: scrolled ? 0 : 20,
        width: scrolled ? '100%' : 'calc(100% - 40px)',
        left: scrolled ? 0 : '20px',
        borderRadius: scrolled ? 0 : '24px',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            fontSize: 20,
            fontWeight: 950,
            letterSpacing: '0.1em',
            color: scrolled ? 'var(--text-primary)' : '#fff'
          }}>
            ATLAS <span style={{ color: 'var(--accent-gold)', fontWeight: 400 }}>RENT</span>
          </div>
        </div>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
        <div className="links" style={{ color: scrolled ? 'var(--text-primary)' : '#fff' }}>
          <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link href="/vehicles" className={router.pathname === '/vehicles' ? 'active' : ''}>Fleet</Link>
          <Link href="/about" className={router.pathname === '/about' ? 'active' : ''}>Heritage</Link>
          <Link href="/blog" className={router.pathname === '/blog' ? 'active' : ''}>Journal</Link>
          <Link href="/contact" className="cta">Book Now</Link>
        </div>

        <button
          className="theme-toggle"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ color: scrolled ? 'var(--text-primary)' : '#fff' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </motion.header>
  );
}
