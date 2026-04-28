import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../components/Layout'
import Link from 'next/link'
import { CheckCircle2, MapPin, Users, Award, Shield, ArrowRight } from 'lucide-react'

import { getTeam } from '../lib/siteContentApi'

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [teamItems, setTeamItems] = useState([])
  const [selectedPerson, setSelectedPerson] = useState(null)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)

      // Fetch leadership data
      ; (async () => {
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
            <h1 style={{ fontSize: isMobile ? 40 : 85, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff' }}>
              Defining <span style={{ color: 'var(--accent-gold)' }}>Excellence</span> <br />
              <span style={{ opacity: 0.6, fontSize: isMobile ? 24 : 60, display: 'block', marginTop: 8 }}>Since Day One</span>
            </h1>
            <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', maxWidth: 650, margin: '0 auto' }}>
              Atlas Rent-a-Car is your trusted mobility partner in Dansoman. We provide reliable, high-end services tailored to your unique travel needs.
            </p>
          </motion.div>
        </section>

        {/* Immersive Elite Tiles - Why Choose Atlas */}
        <section style={{ padding: isMobile ? '60px 20px' : '160px 64px', background: '#fff' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>

            {/* Redesigned Asymmetric Title */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? 20 : 40, marginBottom: isMobile ? 40 : 80 }}>
              <div style={{ width: 4, height: isMobile ? 40 : 80, background: 'var(--accent-gold)' }} />
              <div>
                <div style={{ fontSize: isMobile ? 10 : 12, fontWeight: 900, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: 8 }}>The Atlas Advantage</div>
                <h2 style={{ fontSize: isMobile ? 32 : 64, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  Why Choose <br /> <span style={{ color: 'var(--accent-gold)' }}>The Atlas Experience</span>?
                </h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)', gridAutoRows: isMobile ? 'minmax(280px, auto)' : '350px', gap: 24 }}>
              {[
                { col: 'span 3', icon: <Users />, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200', t: "Wide Range of Vehicles", d: "From sleek sedans and spacious SUVs to rugged 4x4s and comfortable minivans." },
                { col: 'span 3', icon: <Award />, img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200', t: "Affordable Pricing", d: "Competitive rates with flexible rental options, including daily and monthly plans." },
                { col: 'span 2', icon: <CheckCircle2 />, img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200', t: "Exceptional Service", d: "Our professional team is here to ensure your experience is smooth and enjoyable." },
                { col: 'span 2', icon: <MapPin />, img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200', t: "Convenient Location", d: "Situated in Dansoman, we are easily accessible and ready to serve you." },
                { col: 'span 2', icon: <Shield />, img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200', t: "Transparent Policies", d: "No hidden fees—just clear, straightforward pricing and terms." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={!isMobile ? { scale: 0.98 } : {}}
                  className="benefit-tile"
                  style={{
                    gridColumn: isMobile ? 'span 6' : item.col,
                    position: 'relative',
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: '#1a1b1e',
                    border: '1px solid rgba(223, 151, 56, 0.1)',
                    minHeight: isMobile ? 300 : 0
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
                    padding: isMobile ? 24 : 40,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    zIndex: 1
                  }}>
                    <div style={{ color: 'var(--accent-gold)', marginBottom: 12 }}>{item.icon}</div>
                    <h3 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 900, color: '#fff', marginBottom: 8 }}>{item.t}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <style jsx>{`
            .benefit-tile:hover .tile-img {
              transform: ${isMobile ? 'none' : 'scale(1.15)'};
            }
          `}</style>
        </section>

        {/* The Team Section - Interactive Modal Redesign */}
        {teamItems.length > 0 && (
          <section style={{ padding: isMobile ? '80px 24px' : '120px 64px', background: '#fff' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ marginBottom: 64 }}>
                <h2 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 900, color: '#1a1b1e', marginBottom: 16 }}>Meet Our <span style={{ color: 'var(--accent-gold)' }}>Leadership</span></h2>
                <p style={{ color: '#64748b', fontSize: 16 }}>The experts ensuring your safe and seamless travel.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? 40 : 48 }}>
                {teamItems.map((person, i) => (
                  <motion.div
                    key={person.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'left', cursor: 'pointer' }}
                    onClick={() => setSelectedPerson(person)}
                  >
                    <div style={{
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      marginBottom: 20,
                      background: '#f8fafc',
                      border: '1px solid #f1f5f9'
                    }}>
                      {person.image ? (
                        <img src={person.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={person.name} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                          <Users size={48} strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1a1b1e', marginBottom: 4 }}>{person.name}</h3>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>{person.role}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      See Info <ArrowRight size={12} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bio Modal */}
        <AnimatePresence>
          {selectedPerson && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPerson(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10, 10, 12, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: 1000,
                  background: '#fff',
                  borderRadius: 32,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  position: 'relative',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
                }}
              >
                <button
                  onClick={() => setSelectedPerson(null)}
                  style={{ position: 'absolute', top: 24, right: 24, background: '#f8fafc', border: 'none', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
                >
                  <Users size={20} style={{ transform: 'rotate(45deg)' }} />
                </button>

                <div style={{ flex: 1, minHeight: isMobile ? 300 : 600, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedPerson.image ? (
                    <img
                      src={selectedPerson.image}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      alt={selectedPerson.name}
                    />
                  ) : (
                    <Users size={120} strokeWidth={1} style={{ color: '#cbd5e1' }} />
                  )}
                </div>

                <div style={{ flex: 1.2, padding: isMobile ? 32 : 64, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, color: '#1a1b1e', marginBottom: 8 }}>{selectedPerson.name}</h3>
                  <div style={{ fontSize: 16, color: '#64748b', marginBottom: 40 }}>{selectedPerson.role}</div>

                  <div style={{ height: 1, width: 60, background: 'var(--accent-gold)', marginBottom: 32 }} />

                  <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, margin: 0 }}>
                    {selectedPerson.bio}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simple CTA */}
        <section style={{ padding: isMobile ? '80px 20px' : '100px 24px', background: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, marginBottom: 24 }}>Ready for your next journey?</h2>
            <Link href="/vehicles" style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', padding: '16px 40px', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>
              Browse Collection
            </Link>
          </div>
        </section>

      </div>
    </Layout>
  )
}