import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div style={{
            fontSize: 24,
            fontWeight: 950,
            letterSpacing: '0.1em',
            color: '#fff',
            marginBottom: 24
          }}>
            ATLAS <span style={{ color: 'var(--accent-gold)', fontWeight: 400 }}>RENT</span>
          </div>
          <p>
            The global standard for premium vehicle rentals and private mobility. 
            Redefining luxury travel with unrivaled comfort and bespoke concierge services.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
             {/* Social link placeholders */}
             <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}>FB</div>
             <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}>IG</div>
             <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}>X</div>
          </div>
        </div>

        <div className="footer-links">
          <h5>The Heritage</h5>
          <ul>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/vehicles">The Collection</Link></li>
            <li><Link href="/blog">The Journal</Link></li>
            <li><Link href="/contact">Private Hire</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h5>Client Support</h5>
          <ul>
            <li><Link href="/faqs">Guideline & FAQ</Link></li>
            <li><Link href="/reservations">Reservations</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Safety Protocol</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h5>Stay Connected</h5>
          <p style={{ marginBottom: 24 }}>
            Subcribe to receive the latest updates on our elite fleet and seasonal experiences.
          </p>
          <form style={{ display: 'flex', gap: 12 }}>
            <input 
              type="email" 
              placeholder="Your Email" 
              style={{ flex: 1, padding: '14px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
            />
            <button className="premium-btn premium-btn-gold" style={{ padding: '14px 24px', borderRadius: 999 }}>Join</button>
          </form>
        </div>
      </div>

      <div style={{ 
        maxWidth: 'var(--container-max)', 
        margin: '0 auto', 
        marginTop: 100, 
        paddingTop: 40, 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 24,
        color: 'rgba(255,255,255,0.3)'
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} Atlas Rent-A-Car Global Headquarters. All Rights Reserved.
        </div>
        
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Crafted by <a href="https://skytechghana.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)' }}>SkyTech Ghana</a>
        </div>
      </div>
    </footer>
  )
}
