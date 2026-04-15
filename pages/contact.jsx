import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { Phone, MapPin, Mail, Send, Clock, Globe } from 'lucide-react'

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    supportPhone: '+233 30 230 1081',
    headquarters: 'Dansoman, Accra, Ghana',
    adminEmail: 'contact@atlasrent-a-car.com'
  })

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSettings({
            supportPhone: data.supportPhone || '+233 30 230 1081',
            headquarters: data.headquarters || 'Dansoman, Accra, Ghana',
            adminEmail: data.adminEmail || 'contact@atlasrent-a-car.com'
          })
        }
      })
      .catch(console.error)

    return () => window.removeEventListener('resize', handleResize)
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
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        
        {/* Header Section */}
        <section style={{ padding: isMobile ? '120px 24px 60px' : '160px 64px 80px', background: '#f8fafc' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: 40 }}>
              <div style={{ width: 4, height: 80, background: 'var(--accent-gold)', display: isMobile ? 'none' : 'block' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 16 }}>Connect With Us</div>
                <h1 style={{ fontSize: isMobile ? 36 : 64, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>
                  Contact <span style={{ color: 'var(--accent-gold)' }}>Atlas</span>.
                </h1>
                <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.8, maxWidth: 700, margin: 0 }}>
                  Whether you need a bespoke luxury solution, corporate fleet logistics, or a private chauffeur, the team at Atlas Rent-A-Car is standing by to engineer your journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ padding: isMobile ? '60px 24px' : '100px 64px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: isMobile ? 60 : 100 }}>
              
              {/* Form Side */}
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--accent)', marginBottom: 40 }}>Send an Inquiry</h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Full Name *</label>
                    <input name="name" required type="text" placeholder="John Doe" style={{ width: '100%', padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', transition: 'border 0.3s' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email Address *</label>
                    <input name="email" required type="email" placeholder="john@example.com" style={{ width: '100%', padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Subject *</label>
                    <input name="subject" required type="text" placeholder="Rental Inquiry" style={{ width: '100%', padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Your Message *</label>
                    <textarea name="message" required rows={6} placeholder="How can we assist you today?" style={{ width: '100%', padding: '20px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', fontSize: 15 }}></textarea>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <button 
                      disabled={loading}
                      type="submit"
                      style={{ 
                        padding: '18px 48px', 
                        background: 'var(--accent)', 
                        color: '#fff', 
                        borderRadius: 999, 
                        border: 'none', 
                        fontWeight: 800, 
                        cursor: loading ? 'not-allowed' : 'pointer', 
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        opacity: loading ? 0.7 : 1
                      }}
                    >
                      {loading ? 'Sending...' : 'Transmit Inquiry'} <Send size={18} color="var(--accent-gold)" />
                    </button>
                    {status && (
                      <div style={{ marginTop: 24, padding: '16px 24px', borderRadius: 12, background: status.type === 'success' ? '#ecfdf5' : '#fef2f2', color: status.type === 'success' ? '#059669' : '#dc2626', fontSize: 14, fontWeight: 600 }}>
                        {status.message}
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Info Side */}
              <div>
                <div style={{ display: 'grid', gap: 40, position: 'sticky', top: 120 }}>
                  
                  {/* Contact Blocks */}
                  <div style={{ display: 'grid', gap: 32 }}>
                    <div style={{ display: 'flex', gap: 20 }}>
                       <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(223, 151, 56, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Phone size={20} color="var(--accent-gold)" />
                       </div>
                       <div>
                         <div style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Call Us (24/7)</div>
                         <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>{settings.supportPhone}</div>
                       </div>
                    </div>

                    <div style={{ display: 'flex', gap: 20 }}>
                       <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(223, 151, 56, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Mail size={20} color="var(--accent-gold)" />
                       </div>
                       <div>
                         <div style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Email Support</div>
                         <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>{settings.adminEmail}</div>
                       </div>
                    </div>

                    <div style={{ display: 'flex', gap: 20 }}>
                       <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(223, 151, 56, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <MapPin size={20} color="var(--accent-gold)" />
                       </div>
                       <div>
                         <div style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Visit Us</div>
                         <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>{settings.headquarters}</div>
                       </div>
                    </div>
                  </div>

                  {/* Hours Block */}
                  <div style={{ padding: 40, background: 'var(--accent)', borderRadius: 32, color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, color: 'var(--accent-gold)' }}>
                       <Clock size={20} />
                       <span style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Operating Hours</span>
                    </div>
                    <div style={{ display: 'grid', gap: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Mon - Fri</span>
                        <span style={{ fontWeight: 800 }}>8:00 AM - 6:00 PM</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Saturday</span>
                        <span style={{ fontWeight: 800 }}>9:00 AM - 2:00 PM</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Sunday</span>
                        <span style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>Pre-bookings Only</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Continental Reach Showcase - Redesigned for Elite Scale */}
        <section style={{ 
          height: isMobile ? '400px' : '600px', 
          background: '#0a0a0c', 
          position: 'relative', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}>
           <img 
             src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=1600" 
             style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} 
             alt="Service Coverage"
           />
           <div style={{ 
             position: 'absolute', 
             inset: 0, 
             background: isMobile ? 'rgba(10,10,12,0.8)' : 'linear-gradient(to right, rgba(10,10,12,1) 30%, transparent 100%)' 
           }} />
           
           <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, padding: isMobile ? '0 24px' : '0 64px' }}>
              <div style={{ maxWidth: 600 }}>
                 <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 24 }}>Regional Coverage</div>
                 <h2 style={{ fontSize: isMobile ? 32 : 56, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 32 }}>
                   Accra. Takoradi. <br/> <span style={{ color: 'var(--accent-gold)' }}>Kumasi.</span>
                 </h2>
                 <div style={{ width: 60, height: 2, background: 'var(--accent-gold)', marginBottom: 32 }} />
                 <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, margin: 0 }}>
                   With a strategic presence across Accra, Takoradi, and Kumasi, we engineer uncompromised vehicle delivery across Ghana’s primary economic hubs.
                 </p>
              </div>
           </div>
        </section>
      </div>
    </Layout>
  )
}
