import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import IMAGES from '../data/images'
import { motion, AnimatePresence } from 'framer-motion'
import CldOptimizedImage from '../components/CldOptimizedImage'
import { getTestimonials, getNews } from '../lib/siteContentApi'
import Link from 'next/link'
import { Heart, Car, Flag, MessageCircle } from 'lucide-react'
import { useInView } from 'framer-motion'

function Counter({ value, duration = 2 }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/[,.]/g, ''));
      if (start === end) return;

      let totalMiliseconds = duration * 1000;
      let incrementTime = (totalMiliseconds / end) * 5; // simplified logic

      let timer = setInterval(() => {
        start += Math.ceil(end / 100);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  const formatNumber = (num) => {
    if (value.includes('.')) {
      return num.toLocaleString('de-DE');
    }
    return num.toLocaleString();
  };

  return <span ref={ref}>{formatNumber(count)}</span>;
}

function Statistics() {
  const stats = [
    { icon: <Heart size={56} strokeWidth={1.5} />, value: '5657', label: 'HAPPY CUSTOMERS' },
    { icon: <Car size={56} strokeWidth={1.5} />, value: '657', label: 'TOTAL CAR COUNT' },
    { icon: <Flag size={56} strokeWidth={1.5} />, value: '1.255.657', label: 'TOTAL KM/MIL' },
    { icon: <MessageCircle size={56} strokeWidth={1.5} />, value: '1255', label: 'CALL CENTER SOLUTIONS' },
  ];

  return (
    <section style={{ padding: '100px 48px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            style={{ textAlign: 'center', color: 'var(--text-secondary)' }}
          >
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', color: '#94a3b8' }}>
              {s.icon}
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em' }}>
              <Counter value={s.value} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Testimonials({ testimonials, isMobile }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials?.length]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section style={{ padding: isMobile ? '80px 0' : '120px 0', background: 'var(--bg-secondary)', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
      <div className="section-header" style={{ marginBottom: isMobile ? 40 : 64 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 32 : 44, fontWeight: 900 }}>Client Experiences</h2>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: isMobile ? 320 : 250 }}
          >
            <div style={{ color: 'var(--accent-gold)', fontSize: isMobile ? 18 : 24, marginBottom: isMobile ? 20 : 32 }}>
              ★★★★★
            </div>
            <p style={{
              fontSize: isMobile ? 20 : 28,
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              fontWeight: 500,
              marginBottom: isMobile ? 32 : 48,
              fontStyle: 'italic',
              fontFamily: "'Playfair Display', serif"
            }}>
              "{testimonials[currentIndex].quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {testimonials[currentIndex].avatar && (
                <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} style={{ width: isMobile ? 48 : 64, height: isMobile ? 48 : 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff' }} />
              )}
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ margin: 0, fontSize: isMobile ? 15 : 18, fontWeight: 800, color: 'var(--accent)' }}>{testimonials[currentIndex].name}</h4>
                <p style={{ margin: 0, fontSize: isMobile ? 11 : 13, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: isMobile ? 40 : 64 }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? (isMobile ? 24 : 32) : (isMobile ? 8 : 12),
                height: isMobile ? 8 : 12,
                borderRadius: 999,
                background: idx === currentIndex ? 'var(--accent)' : 'var(--border-color)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function News({ newsItems, isMobile }) {
  if (!newsItems || newsItems.length === 0) return null

  return (
    <section style={{ padding: isMobile ? '80px 24px' : '120px 48px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: isMobile ? 40 : 64, display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 24 }}>
        <div style={{ width: 4, height: isMobile ? 32 : 40, background: 'var(--accent-gold)' }} />
        <div>
           <div style={{ fontSize: isMobile ? 9 : 11, fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 4 }}>The Atlas Journal</div>
           <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 900, color: 'var(--accent)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Latest Insights</h2>
        </div>
      </div>

      <div className="custom-horizontal-scroll" style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: isMobile ? 24 : 64, 
        paddingBottom: 24, 
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {newsItems.slice(0, 6).map((n, i) => (
          <Link href={`/blog/${n.slug || n.id}`} key={n.id} style={{ textDecoration: 'none' }}>
            <motion.article 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{ 
                display: 'flex', 
                gap: isMobile ? 16 : 24, 
                alignItems: 'center', 
                minWidth: isMobile ? 280 : 420, 
                flex: `0 0 ${isMobile ? '280px' : '420px'}`, 
                scrollSnapAlign: 'start',
                cursor: 'pointer' 
              }}
            >
              {(n.image || n.img) && (
                <div style={{ 
                  width: isMobile ? 90 : 120, 
                  height: isMobile ? 60 : 80, 
                  flexShrink: 0, 
                  borderRadius: 8, 
                  overflow: 'hidden', 
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0'
                }}>
                   <img 
                     src={n.image || n.img} 
                     alt={n.title} 
                     style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.9)', transition: '0.4s ease' }} 
                   />
                </div>
              )}
              <div style={{ flex: 1 }}>
                 <div style={{ fontSize: isMobile ? 8 : 9, fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{n.category || 'Journal'}</div>
                 <h3 style={{ 
                   fontSize: isMobile ? 14 : 16, 
                   fontWeight: 800, 
                   color: 'var(--accent)', 
                   marginBottom: 4, 
                   lineHeight: 1.3,
                   textDecoration: 'none',
                   display: '-webkit-box', 
                   WebkitLineClamp: isMobile ? 2 : 1, 
                   WebkitBoxOrient: 'vertical', 
                   overflow: 'hidden' 
                 }}>{n.title}</h3>
                 {!isMobile && (
                   <p style={{ 
                     color: '#64748b', 
                     fontSize: 13, 
                     lineHeight: 1.5, 
                     margin: 0,
                     display: '-webkit-box', 
                     WebkitLineClamp: 2, 
                     WebkitBoxOrient: 'vertical', 
                     overflow: 'hidden' 
                   }}>{n.excerpt || n.content}</p>
                 )}
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const [testimonials, setTestimonials] = React.useState([])
  const [newsItems, setNewsItems] = React.useState([])
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)

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
    
    return () => { 
      mounted = false
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Hero />
      <Statistics isMobile={isMobile} />
      <Products limit={6} isMobile={isMobile} />
      <Testimonials testimonials={testimonials} isMobile={isMobile} />
      <News newsItems={newsItems} isMobile={isMobile} />
    </>
  )
}
