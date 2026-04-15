import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/favicon.png" alt="Atlas Rent-A-Car Logo" style={{ height: 48, objectFit: 'contain', marginBottom: 16 }} />
          <p>
            The premium standard for luxury vehicle rentals and private mobility across Ghana.
            Experience unrivaled comfort, safety, and exclusivity.
          </p>
          <div style={{ marginTop: 24 }}>
            <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>Accra, Takoradi, Kumasi</span>
          </div>
        </div>

        <div className="footer-links">
          <h5>Quick Links</h5>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/models">The Fleet</Link></li>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/contact">Client Services</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h5>Legal</h5>
          <ul>
            <li><Link href="#">Terms & Conditions</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Rental Guidelines</Link></li>
            <li><Link href="#">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h5 style={{ color: 'var(--text-primary)', marginBottom: 16 }}>Stay Informed</h5>
          <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: 14 }}>
            Join our private network for exclusive offers and fleet updates.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn-premium" style={{ width: '100%', padding: '12px' }}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div style={{ 
        maxWidth: 1440, 
        margin: '0 auto', 
        marginTop: 64, 
        paddingTop: 32, 
        borderTop: '1px solid var(--glass-border)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        color: 'var(--text-secondary)'
      }}>
        <div style={{ fontSize: 13 }}>
          © {new Date().getFullYear()} Atlas Rent-A-Car. All Rights Reserved.
        </div>
        
        <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
          <a href="https://www.instagram.com/atlasghana/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
          <a href="https://x.com/atlasghana" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
          <a href="https://www.facebook.com/AtlasGhana/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Facebook</a>
        </div>
        
        <div style={{ fontSize: 13 }}>
          Designed by <a href="https://skytechghana.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>SkyTech Ghana</a>
        </div>
      </div>
    </footer>
  )
}
