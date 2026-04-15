import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import Link from 'next/link'
import { CheckCircle2, MapPin, Users, Award, Shield } from 'lucide-react'

import { getTeam } from '../lib/siteContentApi'

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [teamItems, setTeamItems] = useState([])
  
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    
    // Fetch leadership data
    ;(async () => {
      const data = await getTeam()
      setTeamItems(Array.isArray(data) ? data : [])
    })()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Layout>
      <div style={{ background: '#fcfcfd', color: '#24276F' }}>
        
        {/* ... Hero Section remains unchanged ... */}
        {/* Cinematic Hero */}
        <section style={{ 
          minHeight: '60vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(rgba(10, 10, 12, 0.7), rgba(15, 15, 20, 0.9)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: isMobile ? '160px 24px 80px' : '100px 64px'
        }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 800 }}>
            <div style={{ display: 'inline-block', padding: '8px 20px', background: 'rgba(223, 151, 56, 0.15)', border: '1px solid var(--accent-gold)', borderRadius: 999, marginBottom: 24, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
              Our Story
            </div>
            <h1 style={{ fontSize: isMobile ? 44 : 85, fontWeight: 900, marginBottom: 24, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff' }}>
              Defining <span style={{ color: 'var(--accent-gold)' }}>Excellence</span> <br/>
              <span style={{ opacity: 0.6, fontSize: isMobile ? 32 : 60, display: 'block', marginTop: 12 }}>Since Day One</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', maxWidth: 650, margin: '0 auto' }}>
              Atlas Rent-a-Car is your trusted mobility partner in Dansoman, Accra. We are dedicated to providing reliable, affordable, and high-end services tailored to your unique travel needs.
            </p>
          </motion.div>
        </section>

        {/* Immersive Elite Tiles - Why Choose Atlas */}
        <section style={{ padding: isMobile ? '80px 24px' : '160px 64px', background: '#fff' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            
            {/* Redesigned Asymmetric Title */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: 40, marginBottom: 80 }}>
              <div style={{ width: 4, height: 80, background: 'var(--accent-gold)', display: isMobile ? 'none' : 'block' }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 12 }}>The Atlas Advantage</div>
                <h2 style={{ fontSize: isMobile ? 40 : 64, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  Why Choose <br/> <span style={{ color: 'var(--accent-gold)' }}>The Atlas Experience</span>?
                </h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)', gridAutoRows: isMobile ? '300px' : '350px', gap: 24 }}>
              {[
                { col: 'span 3', icon: <Users />, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200', t: "Wide Range of Vehicles", d: "From sleek sedans and spacious SUVs to rugged 4x4s and comfortable minivans, we offer a diverse fleet to suit every occasion." },
                { col: 'span 3', icon: <Award />, img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200', t: "Affordable Pricing", d: "Competitive rates with flexible rental options, including daily, weekly, and monthly plans." },
                { col: 'span 2', icon: <CheckCircle2 />, img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200', t: "Exceptional Service", d: "Our friendly and professional team is here to ensure your experience is smooth and enjoyable." },
                { col: 'span 2', icon: <MapPin />, img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200', t: "Convenient Location", d: "Situated in Dansoman, we are easily accessible and ready to serve you." },
                { col: 'span 2', icon: <Shield />, img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200', t: "Transparent Policies", d: "No hidden fees—just clear, straightforward pricing and terms." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 0.98 }}
                  className="benefit-tile"
                  style={{ 
                    gridColumn: isMobile ? 'span 6' : item.col,
                    position: 'relative',
                    borderRadius: 32,
                    overflow: 'hidden',
                    background: '#1a1b1e',
                    border: '1px solid rgba(223, 151, 56, 0.1)'
                  }}
                >
                  <img 
                    src={item.img} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, transition: 'transform 0.8s ease' }} 
                    className="tile-img"
                    alt={item.t}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to top, rgba(10, 10, 12, 1) 0%, rgba(10, 10, 12, 0.4) 50%, transparent 100%)',
                    padding: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    zIndex: 1
                  }}>
                    <div style={{ color: 'var(--accent-gold)', marginBottom: 16 }}>{item.icon}</div>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 12 }}>{item.t}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <style jsx>{`
            .benefit-tile:hover .tile-img {
              transform: scale(1.15);
            }
          `}</style>
        </section>

        {/* The Team Section */}
        {teamItems.length > 0 && (
          <section style={{ padding: isMobile ? '80px 24px' : '120px 64px', background: '#f8fafc' }}>
              <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                  <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Meet Our <span className="gradient-text">Leadership</span></h2>
                  <p style={{ color: '#64748b' }}>The experts ensuring your safe and seamless travel in Ghana.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
                  {teamItems.map((person, i) => (
                    <motion.div 
                      key={person.id || i}
                      whileHover={{ y: -10 }}
                      style={{ 
                        background: '#fff', 
                        borderRadius: 24, 
                        padding: 32, 
                        boxShadow: '0 10px 30px rgba(36, 39, 111, 0.03)',
                        border: '1px solid #f1f5f9',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ 
                        width: 120, 
                        height: 120, 
                        borderRadius: '50%', 
                        overflow: 'hidden', 
                        margin: '0 auto 24px', 
                        border: '4px solid #f8fafc',
                        background: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#cbd5e1'
                      }}>
                        {person.image ? (
                          <img src={person.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={person.name} />
                        ) : (
                          <Users size={64} strokeWidth={1} />
                        )}
                      </div>
                      <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>{person.name}</h3>
                      <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>{person.role}</div>
                      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{person.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
          </section>
        )}

        {/* Simple CTA */}
        <section style={{ padding: '100px 24px', background: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
             <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>Ready for your next journey?</h2>
             <Link href="/vehicles" className="cta" style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', padding: '16px 40px', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>
               Browse Collection
             </Link>
          </div>
        </section>

      </div>
    </Layout>
  )
}