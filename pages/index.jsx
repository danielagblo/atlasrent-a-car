import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import IMAGES from '../data/images'
import { motion } from 'framer-motion'
import { getTestimonials, getNews } from '../lib/siteContentApi'
import TrustBadges from '../components/TrustBadges'


function Testimonials({ testimonials }) {
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth <= 768)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section style={{ padding: isMobile ? '80px 20px' : '120px 60px', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 1000, height: '100%', background: 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 80 }}>
          <div style={{ fontSize: 12, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, marginBottom: 12 }}>Client Experiences</div>
          <h2 style={{ fontSize: isMobile ? 36 : 48, color: '#fff', marginBottom: 20, letterSpacing: '-0.02em' }}>The Standard of Excellence</h2>
          <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>Trusted by executives and global organizations to deliver uncompromising quality in transport and logistics.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(380px, 1fr))', gap: isMobile ? 24 : 32 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, border: '1px solid rgba(212, 175, 55, 0.2)' }}
              style={{
                position: 'relative',
                padding: isMobile ? 32 : 48,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border 0.3s ease'
              }}
            >
              <div style={{ position: 'absolute', top: 30, right: 30, fontSize: 100, fontFamily: 'Georgia, serif', color: 'rgba(212,175,55,0.06)', lineHeight: 1, userSelect: 'none' }}>”</div>

              <div style={{ position: 'relative', display: 'flex', gap: 6, marginBottom: 32 }}>
                {[...Array(5)].map((_, star) => <span key={star} style={{ color: '#D4AF37', fontSize: 18 }}>★</span>)}
              </div>

              <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', marginBottom: 40, position: 'relative', zIndex: 1 }}>
                "{t.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', background: 'rgba(212,175,55,0.1)', padding: 2 }}>
                  <img src={t.avatar || t.image || IMAGES.hero} alt={t.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontSize: 16, color: '#fff', fontWeight: 700, letterSpacing: '0.02em' }}>{t.name}</h4>
                  <p style={{ margin: 0, fontSize: 12, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{t.role}</p>
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
    <section style={{ padding: '80px 64px', maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 42, color: '#fff', marginBottom: 12 }}>News & Updates</h2>
        <div style={{ width: 60, height: 4, background: 'linear-gradient(90deg, var(--accent), transparent)' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {newsItems.map((n, i) => (
          <article key={n.id} className="news-article">
            <img src={n.image || IMAGES.news1} alt={n.title} style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{n.title}</div>
              <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.5 }}>{n.excerpt?.slice(0, 80)}{n.excerpt?.length > 80 ? '...' : ''}</div>
            </div>
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
      ; (async () => {
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
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
        <TrustBadges />
      </div>
      <Products limit={3} />
      <Testimonials testimonials={testimonials} />
      <News newsItems={newsItems} />
    </>
  )
}
