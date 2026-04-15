import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import IMAGES from '../data/images'
import { motion, AnimatePresence } from 'framer-motion'
import CldOptimizedImage from '../components/CldOptimizedImage'
import { getTestimonials, getNews } from '../lib/siteContentApi'
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

function Testimonials({ testimonials: apiTestimonials }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Always ensure we have testimonials to display
  const defaultTestimonials = [
    { id: 1, quote: 'An absolutely flawless experience. The chauffeur was highly professional, and the vehicle was pristine. I highly recommend Atlas Rent-A-Car for executive travel.', name: 'Kwame Mensah', role: 'Chief Executive Officer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, quote: 'Top-tier luxury and an incredibly smooth booking experience. They handled our corporate event fleet with remarkable precision and care.', name: 'Sarah Osei', role: 'Event Director', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, quote: 'Unmatched comfort level. When I land in Accra, I know my mobility is completely sorted with peace of mind. Simply the best.', name: 'David Adjei', role: 'International Diplomat', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' }
  ];

  const testimonials = apiTestimonials?.length > 0 ? apiTestimonials : defaultTestimonials;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section style={{ padding: '120px 0', background: 'var(--bg-secondary)', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
      <div className="section-header" style={{ marginBottom: 64 }}>
        <h2>Client Experiences</h2>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 250 }}
          >
            <div style={{ color: 'var(--accent)', fontSize: 24, marginBottom: 32 }}>
              ★★★★★
            </div>
            <p style={{
              fontSize: 28,
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              fontWeight: 500,
              marginBottom: 48,
              fontStyle: 'italic'
            }}>
              "{testimonials[currentIndex].quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {testimonials[currentIndex].avatar && (
                <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
              )}
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{testimonials[currentIndex].name}</h4>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 64 }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? 32 : 12,
                height: 12,
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
      <Statistics />
      <Products limit={6} />
      <Testimonials testimonials={testimonials} />
      <News newsItems={newsItems} />
    </>
  )
}
