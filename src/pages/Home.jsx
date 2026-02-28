import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import IMAGES from '../data/images'
import { motion } from 'framer-motion'
import { getTestimonialsWithFallback, getNewsWithFallback } from '../lib/siteContentApi'

const testimonialImages = [IMAGES.testimonial1, IMAGES.testimonial2, IMAGES.testimonial3, IMAGES.testimonial4, IMAGES.testimonial5, IMAGES.testimonial6]
function Testimonials({ testimonials }){
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768)
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const itemsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, testimonials.length - itemsPerView)
  
  const next = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  const prev = () => setCurrentIndex(prev => Math.max(prev - 1, 0))
  
  return (
    <section style={{padding: isMobile ? '40px 20px' : '60px 60px',background:'linear-gradient(180deg, rgba(184,144,51,0.03) 0%, transparent 100%)'}}>
      <div style={{textAlign:'center',marginBottom: isMobile ? 24 : 40}}>
        <h3 style={{fontSize: isMobile ? 28 : 36,marginBottom:12,fontWeight:800}}>Client References</h3>
        <p style={{color:'var(--muted)',fontSize: isMobile ? 14 : 16}}>Hear from our satisfied clients</p>
      </div>
      
      <div style={{position:'relative',maxWidth:1200,margin:'0 auto',padding: isMobile ? '0 40px' : 0}}>
        {/* Navigation Buttons */}
        <button 
          onClick={prev} 
          disabled={currentIndex === 0}
          style={{
            position:'absolute',
            left: isMobile ? -15 : -20,
            top:'50%',
            transform:'translateY(-50%)',
            width: isMobile ? 40 : 48,
            height: isMobile ? 40 : 48,
            borderRadius:'50%',
            background:currentIndex === 0 ? 'rgba(0,0,0,0.1)' : 'linear-gradient(135deg,var(--accent),#ff4444)',
            border:0,
            color:'#fff',
            fontSize:20,
            cursor:currentIndex === 0 ? 'not-allowed' : 'pointer',
            boxShadow:'0 4px 12px rgba(0,0,0,0.15)',
            zIndex:10,
            opacity:currentIndex === 0 ? 0.3 : 1
          }}
        >←</button>
        
        <button 
          onClick={next}
          disabled={currentIndex >= maxIndex}
          style={{
            position:'absolute',
            right: isMobile ? -15 : -20,
            top:'50%',
            transform:'translateY(-50%)',
            width: isMobile ? 40 : 48,
            height: isMobile ? 40 : 48,
            borderRadius:'50%',
            background:currentIndex >= maxIndex ? 'rgba(0,0,0,0.1)' : 'linear-gradient(135deg,var(--accent),#ff4444)',
            border:0,
            color:'#fff',
            fontSize:20,
            cursor:currentIndex >= maxIndex ? 'not-allowed' : 'pointer',
            boxShadow:'0 4px 12px rgba(0,0,0,0.15)',
            zIndex:10,
            opacity:currentIndex >= maxIndex ? 0.3 : 1
          }}
        >→</button>
        
        {/* Carousel Container */}
        <div style={{overflow:'hidden'}}>
          <motion.div 
            animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{display:'flex',gap:20}}
          >
            {testimonials.map((t, i) => (
              <motion.blockquote 
                key={t.id} 
                whileHover={{ y: -6, scale:1.02 }} 
                style={{
                  minWidth:`calc(${100/itemsPerView}% - ${20*(itemsPerView-1)/itemsPerView}px)`,
                  background:'#fff',
                  padding: isMobile ? 24 : 32,
                  borderRadius: isMobile ? 16 : 20,
                  boxShadow:'0 8px 24px rgba(0,0,0,0.08)',
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  border:'1px solid rgba(184,144,51,0.1)'
                }}
              >
                <div style={{
                  width: isMobile ? 60 : 72,
                  height: isMobile ? 60 : 72,
                  borderRadius:'50%',
                  overflow:'hidden',
                  marginBottom: isMobile ? 12 : 16,
                  border: isMobile ? '2px solid var(--accent)' : '3px solid var(--accent)',
                  padding: isMobile ? 2 : 3
                }}>
                  <img src={testimonialImages[i]} alt={t.name} style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover'}}/>
                </div>
                <div style={{
                  fontSize: isMobile ? 24 : 32,
                  color:'var(--accent)',
                  lineHeight:1,
                  marginBottom:12,
                  opacity:0.6
                }}>"</div>
                <p style={{
                  fontStyle:'italic',
                  color:'var(--text)',
                  textAlign:'center',
                  fontSize: isMobile ? 14 : 15,
                  lineHeight:1.6,
                  margin:'0 0 16px 0',
                  minHeight: isMobile ? 'auto' : 80
                }}>{t.quote}</p>
                <div style={{
                  width:40,
                  height:3,
                  background:'linear-gradient(90deg,transparent,var(--accent),transparent)',
                  marginBottom:12
                }}></div>
                <div style={{textAlign:'center'}}>
                  <div style={{fontWeight:700,color:'var(--text)',fontSize: isMobile ? 15 : 16,marginBottom:4}}>{t.name}</div>
                  <div style={{color:'var(--accent)',fontSize: isMobile ? 12 : 13,fontWeight:600}}>{t.role}</div>
                </div>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
        
        {/* Dots Indicator */}
        <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:32}}>
          {Array.from({length: maxIndex + 1}).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width:currentIndex === i ? 24 : 8,
                height:8,
                borderRadius:4,
                background:currentIndex === i ? 'linear-gradient(90deg,var(--accent),#ff4444)' : 'rgba(0,0,0,0.2)',
                border:0,
                cursor:'pointer',
                transition:'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function News({ newsItems }){
  const newsImages = [IMAGES.news1, IMAGES.news2]
  return (
    <section style={{padding:'24px 60px'}}>
      <h3>News & Press</h3>
      <div style={{display:'flex',gap:18,marginTop:12}}>
        {newsItems.map((n, i) => (
          <article key={n.id} style={{display:'flex',gap:12,background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10,minWidth:260}}>
            <img src={n.image || newsImages[i] || IMAGES.news1} alt={n.title} style={{width:120,height:80,objectFit:'cover',borderRadius:8}}/>
            <div>
              <div style={{fontWeight:700}}>{n.title}</div>
              <div style={{color:'var(--muted)',fontSize:13}}>{n.excerpt}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

import TrustBadges from '../components/TrustBadges'

function BrandPartners(){
  const brands = [
    'Ghana Government',
    'Embassy of USA',
    'World Bank',
    'UN Ghana',
    'African Union',
    'ECOWAS',
    'MTN Ghana',
    'Tullow Oil',
    'Vodafone Ghana',
    'Accra Mall',
    'Ecobank',
    'Standard Chartered'
  ]
  
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768)
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <section style={{
      padding: isMobile ? '30px 0' : '50px 0',
      background:'rgba(184,144,51,0.02)',
      borderTop:'1px solid rgba(0,0,0,0.05)',
      borderBottom:'1px solid rgba(0,0,0,0.05)',
      overflow:'hidden'
    }}>
      <div style={{textAlign:'center',marginBottom: isMobile ? 20 : 32}}>
        <p style={{color:'var(--muted)',fontSize: isMobile ? 12 : 14,fontWeight:600,textTransform:'uppercase',letterSpacing:2}}>Trusted By</p>
      </div>
      <div style={{position:'relative',overflow:'hidden'}}>
        <motion.div
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            display:'flex',
            gap:80,
            alignItems:'center',
            whiteSpace:'nowrap'
          }}
        >
          {/* Duplicate brands twice for seamless loop */}
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              style={{
                fontSize: isMobile ? 16 : 20,
                fontWeight:700,
                color:'var(--text)',
                opacity:0.7,
                whiteSpace:'nowrap',
                minWidth:'fit-content'
              }}
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function Home(){
  const [testimonials, setTestimonials] = React.useState([])
  const [newsItems, setNewsItems] = React.useState([])

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      const [t, n] = await Promise.all([
        getTestimonialsWithFallback(),
        getNewsWithFallback()
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
      <BrandPartners />
      <Products />
      <Testimonials testimonials={testimonials} />
      <News newsItems={newsItems} />
    </>
  )
}
