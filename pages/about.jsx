import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import IMAGES from '../data/images'

const Lock = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)
const User = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)
const ArrowRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)

const fadeUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768)
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)

    // Fetch live brand settings from Admin configuration
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.featuredBrands) {
          setBrands(data.featuredBrands.split(',').map(s => s.trim()).filter(Boolean))
        }
      })
      .catch(e => console.error('Failed to load branding', e))

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Layout>
      {/* Header Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 60px', background: 'linear-gradient(180deg, rgba(184,144,51,0.05) 0%, transparent 100%)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: isMobile ? 40 : 56, marginBottom: 20, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            About <span style={{ color: '#D4AF37' }}>EKG</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: isMobile ? 16 : 18, lineHeight: 1.6 }}>
            A wholly owned Ghanaian company providing premium car rental, logistics, travel and tour services tailored for executives and individuals.
          </p>
        </motion.div>
      </section>

      <section className="page page-about" style={{ padding: isMobile ? '20px 20px 40px' : '20px 60px 60px', maxWidth: 1400, margin: '0 auto' }}>

        <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 40 : 60, marginBottom: isMobile ? 60 : 80 }}>
          <motion.div variants={fadeUp} style={{ padding: isMobile ? 32 : 48, background: 'var(--glass)', borderRadius: 24, border: '1px solid var(--glass-border)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 999,
              padding: '6px 16px',
              marginBottom: 24,
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              color: '#D4AF37',
              fontSize: 12,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 700
            }}>Company Profile</div>
            <h3 style={{ fontSize: 32, marginBottom: 24, color: 'var(--text)' }}>Driven by Excellence</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16 }}>
              EKG Transport and Logistics is duly incorporated under the Laws of the Republic of Ghana to provide car rental, logistics, travel and tour services. We are committed to fully meeting and satisfying our customers' requirements and expectations by providing friendly, reliable, cost-effective, timely, and high-quality rental services.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16, marginTop: 16 }}>
              Our principle of flexibility, accessibility and affordability has helped the company to succeed to this day. Our drivers are carefully screened and undergo rigorous training and continuous professional development, guaranteeing the very best in customer service and safety.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} style={{ padding: isMobile ? 32 : 48, background: 'rgba(212, 175, 55, 0.05)', borderRadius: 24, border: '1px solid rgba(212, 175, 55, 0.15)' }}>
            <h3 style={{ fontSize: 24, marginBottom: 24, color: '#D4AF37' }}>Why Choose EKG?</h3>
            <div style={{ display: 'grid', gap: 16 }}>
              {[
                "Wide selection of cars with full range accessories for comfort and safety",
                "All vehicles comprehensively insured with valid licenses and certifications",
                "24-hour monitored tracking device installed in all vehicles",
                "Well trained defensive drivers with valid Ghanaian driver licence",
                "Unlimited mileage per day with flexible payment options",
                "Quick vehicle replacement during unexpected breakdowns"
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#D4AF37', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>✓</div>
                  <p style={{ color: 'var(--text)', margin: 0, fontSize: 15, lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h3 style={{ fontSize: isMobile ? 32 : 40, color: 'var(--text)', marginBottom: 16 }}>Our Core Services</h3>
            <p style={{ color: 'var(--muted)', fontSize: 16 }}>End-to-end transport solutions designed for your needs.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '🚗', title: 'Car Rental', desc: `Ultra-modern cars from ${brands.length > 0 ? brands.join(', ') : 'leading brands'}. Short, medium and long-term hire with flexible rates.` },
              { icon: '🗺️', title: 'Travel & Tour', desc: 'City tours, coastal tours, culture tours, festival tours and natural environment tours across Ghana.' },
              { icon: '📋', title: 'Immigration Services', desc: 'Visa on arrival, work permits, residence permits and accommodation assistance for international staff.' },
              { icon: '🤝', title: 'Meet & Greet', desc: 'Personalized welcome ceremonies with local culture dance groups for VIPs and special guests.' },
              { icon: '📦', title: 'Logistics', desc: 'Comprehensive supply chain and logistics solutions for your business needs.' },
              { icon: '👨‍✈️', title: 'Chauffeur Services', desc: 'Professional chauffeur-driven services with drivers who have broad knowledge of Ghana.' }
            ].map((srv, idx) => (
              <motion.div key={idx} whileHover={{ y: -8, border: '1px solid rgba(212, 175, 55, 0.4)' }} style={{ padding: 32, background: 'var(--glass)', borderRadius: 20, border: '1px solid var(--glass-border)', transition: 'all 0.3s ease' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 20 }}>{srv.icon}</div>
                <h4 style={{ marginBottom: 12, fontSize: 20, color: 'var(--text)' }}>{srv.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chauffeur Details */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: isMobile ? 60 : 100 }}>
          <h3 style={{ fontSize: isMobile ? 32 : 40, marginBottom: 40, textAlign: 'center', color: 'var(--text)' }}>Chauffeur-Driven Service</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40 }}>
            <div style={{ padding: 40, background: 'var(--glass)', borderRadius: 24, border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ fontSize: 32 }}>⏰</div>
                <h4 style={{ fontSize: 24, color: 'var(--text)', margin: 0 }}>Service Hours</h4>
              </div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { k: 'Minimum Rental', v: '6 hours per day' },
                  { k: 'Maximum Rental', v: '12 hours per day' },
                  { k: 'Additional Hours', v: 'Charged per hour based on vehicle type' },
                  { k: 'Driver Break', v: '12:00 noon - 2:00 PM' }
                ].map((h, i) => (
                  <div key={i} style={{ padding: 16, background: 'var(--glass)', borderRadius: 12, border: '1px solid var(--glass-border)' }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, color: '#D4AF37', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h.k}</div>
                    <div style={{ color: 'var(--text)', fontSize: 15 }}>{h.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: 40, background: 'var(--glass)', borderRadius: 24, border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ fontSize: 32 }}>💰</div>
                <h4 style={{ fontSize: 24, color: 'var(--text)', margin: 0 }}>Chauffeur Allowances</h4>
              </div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { k: 'Outside Accra (Day Trip)', v: '$10.00 per day' },
                  { k: 'Outside Accra (Overnight)', v: '$20.00 per night' },
                  { k: 'Outside Ghana', v: '$35.00 per night (for accommodation)' }
                ].map((h, i) => (
                  <div key={i} style={{ padding: 16, background: 'var(--glass)', borderRadius: 12, border: '1px solid var(--glass-border)' }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, color: '#D4AF37', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h.k}</div>
                    <div style={{ color: 'var(--text)', fontSize: 15 }}>{h.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, padding: 32, background: 'rgba(212, 175, 55, 0.05)', borderRadius: 24, border: '1px solid rgba(212, 175, 55, 0.15)' }}>
            <h4 style={{ fontSize: 20, marginBottom: 20, color: '#D4AF37' }}>Important Notes</h4>
            <div style={{ display: 'grid', gap: 16 }}>
              {[
                "All vehicles are comprehensively insured, and the driver oversees vehicle safety.",
                "Reasonable break and lunch periods (12 noon - 2:00 PM) are mandatory for driver welfare.",
                "Clients must sign log sheets and verify fuel levels at the close of each day.",
                "Driver allowances are paid in addition to vehicle rental fees for services outside Accra and Ghana."
              ].map((note, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4AF37', flexShrink: 0 }}></div>
                  <p style={{ color: 'var(--text)', margin: 0, fontSize: 15 }}>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Brands Box */}
        <motion.div whileInView={{ scale: [0.95, 1], opacity: [0, 1] }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={{ marginTop: 80, padding: isMobile ? 40 : 60, background: 'linear-gradient(135deg, rgba(227, 6, 19, 0.1), rgba(212, 175, 55, 0.1))', borderRadius: 24, border: '1px solid rgba(212, 175, 55, 0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, marginBottom: 12 }}>Authorized Fleet</div>
          <h3 style={{ fontSize: isMobile ? 28 : 36, marginBottom: 32, color: 'var(--text)' }}>Vehicle Brands We Offer</h3>
          <div style={{ display: 'flex', gap: isMobile ? 24 : 48, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            {brands.map(brand => (
              <div key={brand} style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: 'var(--text)', opacity: 0.9, letterSpacing: '-0.02em', margin: '0 12px' }}>{brand}</div>
            ))}
          </div>
          <p style={{ color: 'var(--muted)', marginTop: 24, fontSize: 16 }}>Available in sedan, 4x4, mini bus and vans.</p>
        </motion.div>

      </section>

      {/* Display Fleet / Products Section */}

    </Layout>
  )
}