import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function About(){
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="page page-about" style={{padding: isMobile ? '40px 20px' : '80px 60px', maxWidth: 1400, margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: isMobile ? 40 : 60}}>
        <h2 style={{fontSize: isMobile ? 28 : 42, marginBottom: 16}}>About EKG Transport & Logistics</h2>
        <p style={{color:'var(--muted)', fontSize: isMobile ? 16 : 18, maxWidth: 800, margin: '0 auto'}}>
          A wholly owned Ghanaian company providing premium car rental, logistics, travel and tour services.
        </p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48, marginBottom: isMobile ? 40 : 60}}>
        <div style={{padding: 32, background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)'}}>
          <h3 style={{fontSize: 28, marginBottom: 20}}>Company Profile</h3>
          <p style={{color: 'var(--muted)', lineHeight: 1.7, fontSize: 15}}>
            EKG Transport and Logistics is duly incorporated under the Laws of the Republic of Ghana to provide car rental, logistics, travel and tour services. We are committed to fully meeting and satisfying our customers' requirements and expectations by providing friendly, reliable, cost effective, timely and high-quality rental services.
          </p>
          <p style={{color: 'var(--muted)', lineHeight: 1.7, fontSize: 15, marginTop: 16}}>
            Our principle of flexibility, accessibility and affordability has helped the company to succeed to this day. Our drivers are carefully screened and undergo rigorous training and continuous professional development, guaranteeing the very best in customer service and safety.
          </p>
        </div>

        <div style={{padding: 32, background: 'rgba(212, 178, 106, 0.08)', borderRadius: 20, border: '1px solid rgba(212, 178, 106, 0.2)'}}>
          <h3 style={{fontSize: 28, marginBottom: 20}}>Why Choose EKG?</h3>
          <div style={{display: 'grid', gap: 12}}>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 20}}>✓</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Wide selection of cars with full range accessories for comfort and safety</p>
            </div>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 20}}>✓</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>All vehicles comprehensively insured with valid licenses and certifications</p>
            </div>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 20}}>✓</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>24-hour monitored tracking device installed in all vehicles</p>
            </div>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 20}}>✓</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Well trained defensive drivers with valid Ghanaian driver licence</p>
            </div>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 20}}>✓</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Unlimited mileage per day with flexible payment options</p>
            </div>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 20}}>✓</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Quick vehicle replacement during unexpected breakdowns</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{marginTop: isMobile ? 40 : 60}}>
        <h3 style={{fontSize: isMobile ? 24 : 32, marginBottom: isMobile ? 24 : 32, textAlign: 'center'}}>Our Services</h3>
        <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24}}>
          <motion.div whileHover={{y: -6}} style={{padding: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize: 40, marginBottom: 16}}>🚗</div>
            <h4 style={{marginBottom: 12, fontSize: 20}}>Car Rental</h4>
            <p style={{color: 'var(--muted)', fontSize: 14, lineHeight: 1.6}}>
              Ultra-modern cars from Toyota, Honda, Nissan, Hyundai. Short, medium and long-term hire with flexible rates.
            </p>
          </motion.div>

          <motion.div whileHover={{y: -6}} style={{padding: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize: 40, marginBottom: 16}}>🗺️</div>
            <h4 style={{marginBottom: 12, fontSize: 20}}>Travel & Tour</h4>
            <p style={{color: 'var(--muted)', fontSize: 14, lineHeight: 1.6}}>
              City tours, coastal tours, culture tours, festival tours and natural environment tours across Ghana.
            </p>
          </motion.div>

          <motion.div whileHover={{y: -6}} style={{padding: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize: 40, marginBottom: 16}}>📋</div>
            <h4 style={{marginBottom: 12, fontSize: 20}}>Immigration Services</h4>
            <p style={{color: 'var(--muted)', fontSize: 14, lineHeight: 1.6}}>
              Visa on arrival, work permits, residence permits and accommodation assistance for international staff.
            </p>
          </motion.div>

          <motion.div whileHover={{y: -6}} style={{padding: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize: 40, marginBottom: 16}}>🤝</div>
            <h4 style={{marginBottom: 12, fontSize: 20}}>Meet & Greet</h4>
            <p style={{color: 'var(--muted)', fontSize: 14, lineHeight: 1.6}}>
              Personalized welcome ceremonies with local culture dance groups for VIPs and special guests.
            </p>
          </motion.div>

          <motion.div whileHover={{y: -6}} style={{padding: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize: 40, marginBottom: 16}}>📦</div>
            <h4 style={{marginBottom: 12, fontSize: 20}}>Logistics</h4>
            <p style={{color: 'var(--muted)', fontSize: 14, lineHeight: 1.6}}>
              Comprehensive supply chain and logistics solutions for your business needs.
            </p>
          </motion.div>

          <motion.div whileHover={{y: -6}} style={{padding: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize: 40, marginBottom: 16}}>👨‍✈️</div>
            <h4 style={{marginBottom: 12, fontSize: 20}}>Chauffeur Services</h4>
            <p style={{color: 'var(--muted)', fontSize: 14, lineHeight: 1.6}}>
              Professional chauffeur-driven services with drivers who have broad knowledge of Ghana.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Chauffeur Service Details */}
      <div style={{marginTop: isMobile ? 40 : 60}}>
        <h3 style={{fontSize: isMobile ? 24 : 32, marginBottom: isMobile ? 24 : 32, textAlign: 'center'}}>Chauffeur-Driven Service</h3>
        <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 32}}>
          <div style={{padding: 32, background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize: 40, marginBottom: 20, textAlign: 'center'}}>⏰</div>
            <h4 style={{fontSize: 22, marginBottom: 20, textAlign: 'center'}}>Service Hours</h4>
            <div style={{display: 'grid', gap: 16}}>
              <div style={{padding: 16, background: 'rgba(212, 178, 106, 0.08)', borderRadius: 12}}>
                <div style={{fontWeight: 700, marginBottom: 6, color: 'var(--accent-2)'}}>Minimum Rental</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>6 hours per day</div>
              </div>
              <div style={{padding: 16, background: 'rgba(212, 178, 106, 0.08)', borderRadius: 12}}>
                <div style={{fontWeight: 700, marginBottom: 6, color: 'var(--accent-2)'}}>Maximum Rental</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>12 hours per day</div>
              </div>
              <div style={{padding: 16, background: 'rgba(212, 178, 106, 0.08)', borderRadius: 12}}>
                <div style={{fontWeight: 700, marginBottom: 6, color: 'var(--accent-2)'}}>Additional Hours</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>Charged per hour based on vehicle type</div>
              </div>
              <div style={{padding: 16, background: 'rgba(212, 178, 106, 0.08)', borderRadius: 12}}>
                <div style={{fontWeight: 700, marginBottom: 6, color: 'var(--accent-2)'}}>Driver Break</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>12:00 noon - 2:00 PM</div>
              </div>
            </div>
          </div>

          <div style={{padding: 32, background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize: 40, marginBottom: 20, textAlign: 'center'}}>💰</div>
            <h4 style={{fontSize: 22, marginBottom: 20, textAlign: 'center'}}>Chauffeur Allowances</h4>
            <div style={{display: 'grid', gap: 16}}>
              <div style={{padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontWeight: 700, marginBottom: 6, color: 'var(--accent-2)'}}>Outside Accra (Day Trip)</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>$10.00 per day</div>
              </div>
              <div style={{padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontWeight: 700, marginBottom: 6, color: 'var(--accent-2)'}}>Outside Accra (Overnight)</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>$20.00 per night</div>
              </div>
              <div style={{padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontWeight: 700, marginBottom: 6, color: 'var(--accent-2)'}}>Outside Ghana</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>$35.00 per night (for accommodation)</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{marginTop: 24, padding: 24, background: 'rgba(212, 178, 106, 0.08)', borderRadius: 16, border: '1px solid rgba(212, 178, 106, 0.2)'}}>
          <h4 style={{fontSize: 18, marginBottom: 12, color: 'var(--accent-2)'}}>Important Notes</h4>
          <div style={{display: 'grid', gap: 12}}>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 18, color: 'var(--accent)'}}>•</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>All vehicles are comprehensively insured, and the driver oversees vehicle safety</p>
            </div>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 18, color: 'var(--accent)'}}>•</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Reasonable break and lunch periods (12 noon - 2:00 PM) are mandatory for driver welfare</p>
            </div>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 18, color: 'var(--accent)'}}>•</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Clients must sign log sheets and verify fuel levels at the close of each day</p>
            </div>
            <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <span style={{fontSize: 18, color: 'var(--accent)'}}>•</span>
              <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Driver allowances are paid in addition to vehicle rental fees for services outside Accra and Ghana</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Breakdown & Maintenance */}
      <div style={{marginTop: isMobile ? 40 : 60}}>
        <h3 style={{fontSize: isMobile ? 24 : 32, marginBottom: isMobile ? 24 : 32, textAlign: 'center'}}>Vehicle Breakdown Contingency Plan</h3>
        <p style={{textAlign: 'center', color: 'var(--muted)', maxWidth: 800, margin: `0 auto ${isMobile ? 32 : 40}px`, fontSize: isMobile ? 15 : 16}}>
          EKG has implemented comprehensive measures to minimize the impact of unexpected vehicle breakdowns on our clients.
        </p>

        <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 32, marginBottom: isMobile ? 24 : 32}}>
          <div style={{padding: 32, background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)'}}>
            <div style={{fontSize: 40, marginBottom: 20, textAlign: 'center'}}>🔧</div>
            <h4 style={{fontSize: 22, marginBottom: 20, textAlign: 'center'}}>Preventive Measures</h4>
            <div style={{display: 'grid', gap: 16}}>
              <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                <span style={{fontSize: 20, color: 'var(--accent)', minWidth: 24}}>✓</span>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Drivers are required to perform thorough checks before every trip</p>
              </div>
              <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                <span style={{fontSize: 20, color: 'var(--accent)', minWidth: 24}}>✓</span>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Regular routine maintenance at 5,000km or as per manufacturer recommendations</p>
              </div>
              <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                <span style={{fontSize: 20, color: 'var(--accent)', minWidth: 24}}>✓</span>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>All vehicles maintained by dedicated and experienced workshops</p>
              </div>
              <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                <span style={{fontSize: 20, color: 'var(--accent)', minWidth: 24}}>✓</span>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Replacement vehicles provided during scheduled maintenance periods</p>
              </div>
            </div>
          </div>

          <div style={{padding: 32, background: 'rgba(255, 80, 80, 0.08)', borderRadius: 20, border: '1px solid rgba(255, 80, 80, 0.2)'}}>
            <div style={{fontSize: 40, marginBottom: 20, textAlign: 'center'}}>🚨</div>
            <h4 style={{fontSize: 22, marginBottom: 20, textAlign: 'center'}}>Emergency Protocol</h4>
            <div style={{display: 'grid', gap: 16}}>
              <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                <span style={{fontSize: 20, color: '#ff8080', minWidth: 24}}>1.</span>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Call EKG emergency hotlines immediately if you experience any problems</p>
              </div>
              <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                <span style={{fontSize: 20, color: '#ff8080', minWidth: 24}}>2.</span>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Quick vehicle replacement arranged for unexpected breakdowns</p>
              </div>
              <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                <span style={{fontSize: 20, color: '#ff8080', minWidth: 24}}>3.</span>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}><strong>DO NOT</strong> allow anyone to service or repair the vehicle without EKG approval</p>
              </div>
              <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                <span style={{fontSize: 20, color: '#ff8080', minWidth: 24}}>4.</span>
                <p style={{color: 'var(--muted)', margin: 0, fontSize: 15}}>Only EKG-authorized workshops should handle all repairs</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{padding: 32, background: 'linear-gradient(135deg, rgba(184, 144, 51, 0.15), rgba(212, 178, 106, 0.15))', borderRadius: 20, border: '1px solid rgba(212, 178, 106, 0.3)', textAlign: 'center'}}>
          <h4 style={{fontSize: 22, marginBottom: 16, color: 'var(--accent-2)'}}>Emergency Contact Numbers</h4>
          <div style={{display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20}}>
            <a href="tel:+233501326989" style={{textDecoration: 'none'}}>
              <div style={{padding: '16px 28px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, border: '1px solid rgba(212, 178, 106, 0.4)'}}>
                <div style={{fontSize: 24, fontWeight: 800, color: 'var(--accent-2)', marginBottom: 4}}>📞 +233 (0)501 326 989</div>
              </div>
            </a>
            <a href="tel:+233204001146" style={{textDecoration: 'none'}}>
              <div style={{padding: '16px 28px', background: 'rgba(0,0,0,0.3)', borderRadius: 12, border: '1px solid rgba(212, 178, 106, 0.4)'}}>
                <div style={{fontSize: 24, fontWeight: 800, color: 'var(--accent-2)', marginBottom: 4}}>📞 +233 (0)204 001 146</div>
              </div>
            </a>
          </div>
          <p style={{color: 'var(--muted)', marginTop: 20, fontSize: 14}}>24/7 Emergency Assistance Available</p>
        </div>
      </div>

      <div style={{marginTop: 60, padding: 40, background: 'linear-gradient(135deg, rgba(184, 144, 51, 0.1), rgba(212, 178, 106, 0.1))', borderRadius: 20, border: '1px solid rgba(212, 178, 106, 0.2)', textAlign: 'center'}}>
        <h3 style={{fontSize: 28, marginBottom: 16}}>Vehicle Brands We Offer</h3>
        <div style={{display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24}}>
          <div style={{fontSize: 20, fontWeight: 700, color: 'var(--accent-2)'}}>Toyota</div>
          <div style={{fontSize: 20, fontWeight: 700, color: 'var(--accent-2)'}}>Honda</div>
          <div style={{fontSize: 20, fontWeight: 700, color: 'var(--accent-2)'}}>Nissan</div>
          <div style={{fontSize: 20, fontWeight: 700, color: 'var(--accent-2)'}}>Hyundai</div>
        </div>
        <p style={{color: 'var(--muted)', marginTop: 20, fontSize: 15}}>Available in sedan, 4x4, mini bus and vans</p>
      </div>
    </section>
  )
}
