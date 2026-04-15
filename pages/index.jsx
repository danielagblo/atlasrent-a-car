import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import IMAGES from '../data/images'
import { motion } from 'framer-motion'
import CldOptimizedImage from '../components/CldOptimizedImage'
import { getTestimonials, getNews } from '../lib/siteContentApi'

function PremiumServices() {
  const services = [
    { title: 'Chauffeur Services', desc: 'Elite, professionally trained drivers for a seamless experience.' },
    { title: 'Airport Transfers', desc: 'Punctual VIP pickups from Kotoka International and beyond.' },
    { title: 'Corporate Logistics', desc: 'Tailored mobility solutions for businesses and executives.' },
  ]
  return (
    <section style={{ padding: '80px 48px', maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
        {services.map((s, i) => (
          <motion.div 
            key={i} 
            className="glass-panel hover-lift" 
            style={{ padding: 40, textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div style={{ width: 64, height: 64, margin: '0 auto 24px', background: '#fff', border: '3px solid #000', boxShadow: '4px 4px 0px 0px var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h3 style={{ fontSize: 22, marginBottom: 16 }}>{s.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Testimonials({ testimonials: apiTestimonials }) {
  // Always ensure we have testimonials to display
  const defaultTestimonials = [
    { id: 1, quote: 'An absolutely flawless experience. The chauffeur was highly professional, and the vehicle was pristine. I highly recommend Atlas Rent-A-Car for executive travel.', name: 'Kwame Mensah', role: 'Chief Executive Officer', avatar: '' },
    { id: 2, quote: 'Top-tier luxury and an incredibly smooth booking experience. They handled our corporate event fleet with remarkable precision and care.', name: 'Sarah Osei', role: 'Event Director', avatar: '' },
    { id: 3, quote: 'Unmatched comfort level. When I land in Accra, I know my mobility is completely sorted with peace of mind. Simply the best.', name: 'David Adjei', role: 'International Diplomat', avatar: '' }
  ];

  const testimonials = apiTestimonials?.length > 0 ? apiTestimonials : defaultTestimonials;

  return (
    <section style={{ padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <div className="section-header">
        <h2>Client Experiences</h2>
        <p>Trusted by global organizations and executives.</p>
      </div>

      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 32, paddingBottom: 32, scrollSnapType: 'x mandatory' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="glass-panel"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: 48,
                minWidth: 400,
                flex: '0 0 400px',
                scrollSnapAlign: 'start',
                position: 'relative'
              }}
            >
              <div style={{ 
                position: 'absolute', top: 20, right: 30, fontSize: 80, 
                fontFamily: 'serif', color: 'var(--glass-border-highlight)', 
                lineHeight: 1 
              }}>”</div>
              <div style={{ color: 'var(--accent)', marginBottom: 24, fontSize: 18 }}>
                ★★★★★
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: 32, fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {t.avatar && (
                  <img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, border: '2px solid #000', objectFit: 'cover' }} />
                )}
                <div>
                  <h4 style={{ margin: 0, fontSize: 16 }}>{t.name}</h4>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function News({ newsItems }) {
  if (!newsItems || newsItems.length === 0) return null

  return (
    <section style={{ padding: '80px 48px', maxWidth: 1440, margin: '0 auto' }}>
      <div className="section-header" style={{ textAlign: 'left' }}>
        <h2>Latest Insights</h2>
        <div style={{ width: 60, height: 6, background: 'var(--accent)' }}></div>
      </div>

      <div style={{ display: 'flex', overflowX: 'auto', gap: 24, paddingBottom: 16, scrollSnapType: 'x mandatory' }}>
        {newsItems.map((n, i) => (
          <article key={n.id} style={{ minWidth: 340, flex: '0 0 340px', scrollSnapAlign: 'start' }}>
            <div style={{ height: 200, border: '3px solid #000', overflow: 'hidden', marginBottom: 16 }}>
              <CldOptimizedImage src={n.image || IMAGES.news1} alt={n.title} width={340} height={200} crop="fill" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
            </div>
            <h3 style={{ fontSize: 20, marginBottom: 12 }}>{n.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>{n.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const [testimonials, setTestimonials] = React.useState([])
  const [newsItems, setNewsItems] = React.useState([])

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      const [t, n] = await Promise.all([
        getTestimonials(),
        getNews()
      ])
      if (!mounted) return
      setTestimonials(t)
      setNewsItems(n)
    })()
    return () => { mounted = false }
  }, [])

  return (
    <>
      <Hero />
      <PremiumServices />
      <Products limit={6} />
      <Testimonials testimonials={testimonials} />
      <News newsItems={newsItems} />
    </>
  )
}
