import React from 'react'
import { motion } from 'framer-motion'

const PARTNER_LOGOS = [
  { name: "Nissan Ghana", url: "/nissan ghana.png" },
  { name: "UMB Bank", url: "/UMB-Logo-Black.png" },
  { name: "GAPFA Ghana", url: "/GAPFA.png" },
  { name: "Ministry of Foreign Affairs", url: "/ministry of foreign affairs.png" },
  { name: "Ghana Tourism Authority", url: "/Ghana Tourism Authority.png" },
  { name: "MISA Energy", url: "/misa energy.png" },
  { name: "Rent It Ghana", url: "/rentit.png" },
  { name: "Winneba United", url: "/wineba united.jpg" },
  { name: "JSA Boys Mentorship", url: "/jsa.png" },
  { name: "Dodi World", url: "/dodi world.png" }
]

export default function PartnerMarquee() {
  // Triple the list to ensure bridge-less infinite scroll
  const marqueeItems = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS]

  return (
    <section style={{ 
      background: '#f8fafc', 
      padding: '50px 0', 
      borderTop: '1px solid #f0f0f0', 
      borderBottom: '1px solid #f0f0f0',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Decorative Branding Label */}
      <div style={{ 
        position: 'absolute', 
        left: 0, 
        top: 0, 
        padding: '2px 12px', 
        background: 'var(--accent-gold)', 
        color: '#fff', 
        fontSize: '8px', 
        fontWeight: 900, 
        textTransform: 'uppercase', 
        letterSpacing: '0.2em',
        zIndex: 10
      }}>
        Affiliate Network
      </div>

      <div style={{ display: 'flex', width: 'fit-content' }}>
        <motion.div
          animate={{ x: [0, -2500] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
          style={{ display: 'flex', gap: 100, alignItems: 'center', whiteSpace: 'nowrap' }}
        >
          {marqueeItems.map((partner, i) => (
            <div key={i} style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              flexShrink: 0
            }}>
              <img 
                src={partner.url} 
                alt={`${partner.name} logo`}
                style={{ 
                  height: '45px', 
                  width: 'auto', 
                  maxWidth: '180px',
                  objectFit: 'contain',
                  filter: 'none',
                  opacity: 0.8,
                  transition: '0.4s ease'
                }} 
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Soft Fade Edges */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #f8fafc 0%, transparent 15%, transparent 85%, #f8fafc 100%)', pointerEvents: 'none' }} />
    </section>
  )
}
