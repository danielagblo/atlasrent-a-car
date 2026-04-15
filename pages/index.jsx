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
    { icon: <Heart size={32} strokeWidth={1.5} />, value: '5657', label: 'Global Clients' },
    { icon: <Car size={32} strokeWidth={1.5} />, value: '657', label: 'Premium Fleet' },
    { icon: <Flag size={32} strokeWidth={1.5} />, value: '1.255.657', label: 'Miles Covered' },
    { icon: <MessageCircle size={32} strokeWidth={1.5} />, value: '1255', label: 'Executive Concierge' },
  ];

  return (
    <section className="section-spacing" style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 60 }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            style={{ textAlign: 'left' }}
          >
            <div style={{ marginBottom: 24, color: 'var(--accent-gold)' }}>
              {s.icon}
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, color: 'var(--accent)', marginBottom: 8, letterSpacing: '-0.04em', fontFamily: 'Inter' }}>
              <Counter value={s.value} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
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
  const defaultTestimonials = [
    { id: 1, quote: 'An absolutely flawless experience. The chauffeur was highly professional, and the vehicle was pristine. I highly recommend Atlas Rent-A-Car for executive travel.', name: 'Kwame Mensah', role: 'Chief Executive Officer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, quote: 'Top-tier luxury and an incredibly smooth booking experience. They handled our corporate event fleet with remarkable precision and care.', name: 'Sarah Osei', role: 'Event Director', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, quote: 'Unmatched comfort level. When I land in Accra, I know my mobility is completely sorted with peace of mind. Simply the best.', name: 'David Adjei', role: 'International Diplomat', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' }
  ];

  const testimonials = apiTestimonials?.length > 0 ? apiTestimonials : defaultTestimonials;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="testimonial-section section-spacing" style={{ overflow: 'hidden', position: 'relative' }}>
      <div className="container">
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}
          >
            {[1,2,3,4,5].map(star => <div key={star} style={{ color: 'var(--accent-gold)', fontSize: 14 }}>★</div>)}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="testimonial-quote">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                {testimonials[currentIndex].avatar && (
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name} 
                    style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }} 
                  />
                )}
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: '#fff' }}>{testimonials[currentIndex].name}</h4>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 64 }}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: idx === currentIndex ? 40 : 8,
                  height: 2,
                  background: idx === currentIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function News({ newsItems }) {
  if (!newsItems || newsItems.length === 0) return null

  return (
    <section className="section-spacing" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 16 }}>The Collections</div>
            <h2 style={{ margin: 0 }}>Atlas <span className="gradient-gold">Journal</span></h2>
          </div>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--accent)', 
            fontWeight: 800, 
            fontSize: 13, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            cursor: 'pointer',
            paddingBottom: 4,
            borderBottom: '2px solid var(--accent-gold)'
          }}>View All Stories</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 40 }}>
          {newsItems.slice(0, 3).map((n, i) => (
            <motion.article 
              key={n.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ position: 'relative', height: 400, borderRadius: 24, overflow: 'hidden', marginBottom: 24 }} className="hover-lift">
                <CldOptimizedImage src={n.image || IMAGES.news1} alt={n.title} width={600} height={800} crop="fill" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: '#fff' }}>
                  <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, color: 'var(--accent-gold)' }}>Lifestyle • Executive</div>
                  <h3 style={{ fontSize: 24, color: '#fff', margin: 0 }}>{n.title}</h3>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
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
    <div className="app-root">
      <Hero />
      <Statistics />
      <Products limit={6} />
      <Testimonials testimonials={testimonials} />
      <News newsItems={newsItems} />
    </div>
  )
}
