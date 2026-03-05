import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'

const fadeUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    supportPhone: '+233 501 326 989',
    headquarters: 'Accra, Ghana',
    adminEmail: 'info@ekgsite.com'
  })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSettings({
            supportPhone: data.supportPhone || '+233 501 326 989',
            headquarters: data.headquarters || 'Accra, Ghana',
            adminEmail: data.adminEmail || 'info@ekgsite.com'
          })
        }
      })
      .catch(console.error)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setStatus({ type: 'success', message: 'Thank you! Your inquiry has been sent successfully.' })
        e.target.reset()
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again or call us directly.' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'An error occurred. Please check your connection.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      {/* Header Section */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 60px', background: 'linear-gradient(180deg, rgba(184,144,51,0.05) 0%, transparent 100%)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: isMobile ? 40 : 56, marginBottom: 20, color: '#fff', letterSpacing: '-0.02em' }}>
            Get in Touch
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: isMobile ? 16 : 18, lineHeight: 1.6 }}>
            Whether you need a bespoke transport solution, a fleet for corporate logistics, or a private chauffeur, the team at EKG Transport & Logistics is ready to assist you.
          </p>
        </motion.div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px 80px' : '0 60px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 40 : 80 }}>

          {/* Contact Info Panel */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 24, color: '#D4AF37', marginBottom: 24 }}>Contact Information</h3>
              <div style={{ display: 'grid', gap: 24 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    📞
                  </div>
                  <div>
                    <div style={{ color: 'var(--muted)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Call Us (24/7 Support)</div>
                    <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{settings.supportPhone}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    📍
                  </div>
                  <div>
                    <div style={{ color: 'var(--muted)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Headquarters</div>
                    <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{settings.headquarters}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    ✉️
                  </div>
                  <div>
                    <div style={{ color: 'var(--muted)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>General Inquiries</div>
                    <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{settings.adminEmail}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ padding: 32, background: 'rgba(212, 175, 55, 0.05)', borderRadius: 24, border: '1px solid rgba(212, 175, 55, 0.15)' }}>
              <h4 style={{ fontSize: 18, color: '#fff', marginBottom: 16 }}>Office Hours</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 12 }}>
                <span style={{ color: 'var(--muted)' }}>Monday - Friday</span>
                <span style={{ color: '#fff', fontWeight: 500 }}>8:00 AM - 6:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 12 }}>
                <span style={{ color: 'var(--muted)' }}>Saturday</span>
                <span style={{ color: '#fff', fontWeight: 500 }}>9:00 AM - 2:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Sunday</span>
                <span style={{ color: '#D4AF37', fontWeight: 600 }}>Closed / Pre-bookings only</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ padding: isMobile ? 32 : 48, background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(20px)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <h3 style={{ fontSize: 24, marginBottom: 8, color: '#fff' }}>Send a Message</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: 15 }}>A reservation specialist will follow up shortly.</p>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                  <input name="name" placeholder="John Doe" required style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
                  <input name="email" type="email" placeholder="john@example.com" required style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
                <input name="phone" placeholder="+233..." style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Message *</label>
                <textarea name="message" placeholder="How can we help you?" rows={5} required style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', outline: 'none', resize: 'vertical' }} />
              </div>

              {status && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  fontSize: 14,
                  background: status.type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                  color: status.type === 'success' ? '#4ade80' : '#f87171',
                  border: `1px solid ${status.type === 'success' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`
                }}>
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={loading} style={{
                width: '100%',
                padding: '16px',
                background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #E30613, #ff4444)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: 8,
                transition: 'opacity 0.2s',
              }}
              >
                {loading ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
