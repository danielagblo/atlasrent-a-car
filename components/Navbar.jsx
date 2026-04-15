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
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ padding: scrolled ? '16px 48px' : '24px 48px' }}
    >
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/favicon.png" alt="Atlas Rent-A-Car Logo" style={{ height: 48, objectFit: 'contain' }} />
        </div>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div className="links" aria-hidden={open}>
          <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link href="/models" className={router.pathname === '/models' ? 'active' : ''}>Vehicles</Link>
          <Link href="/about" className={router.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link href="/blog" className={router.pathname === '/blog' ? 'active' : ''}>Blog</Link>
          <Link href="/faqs" className={router.pathname === '/faqs' ? 'active' : ''}>FAQs</Link>
          <Link href="/contact" className="cta">Contact Us</Link>
        </div>

        <button
          className="theme-toggle"
          style={{ display: 'none' /* Will show via CSS media query on mobile */ }}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </motion.header>
  );
}
