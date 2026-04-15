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
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [open])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ padding: scrolled ? '12px 24px' : '24px 48px' }}
    >
      <Link href="/" onClick={() => setOpen(false)} style={{ textDecoration: 'none', color: 'inherit', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/favicon.png" alt="Atlas Rent-A-Car Logo" style={{ height: scrolled ? 40 : 48, objectFit: 'contain', transition: '0.3s' }} />
        </div>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div className={`links ${open ? 'mobile-open' : ''}`} aria-hidden={!open}>
          <Link href="/" onClick={() => setOpen(false)} className={router.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link href="/vehicles" onClick={() => setOpen(false)} className={router.pathname === '/vehicles' ? 'active' : ''}>Vehicles</Link>
          <Link href="/about" onClick={() => setOpen(false)} className={router.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link href="/blog" onClick={() => setOpen(false)} className={router.pathname === '/blog' ? 'active' : ''}>Blog</Link>
          <Link href="/faqs" onClick={() => setOpen(false)} className={router.pathname === '/faqs' ? 'active' : ''}>FAQs</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="cta">Contact Us</Link>
        </div>

        <button
          className="theme-toggle"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </motion.header>
  );
}
