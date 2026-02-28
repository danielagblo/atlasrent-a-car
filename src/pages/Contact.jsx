import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Contact(){
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="page page-contact" style={{padding: isMobile ? '40px 20px' : '60px', maxWidth: 1400, margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: isMobile ? 32 : 48}}>
        <h2 style={{fontSize: isMobile ? 28 : 42, marginBottom: 12}}>Get In Touch</h2>
        <p style={{color:'var(--muted)', fontSize: isMobile ? 16 : 18}}>Interested in a test drive or partnership? We'd love to hear from you.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 48, alignItems: 'start'}}>
        {/* Contact Information */}
        <div>
          <h3 style={{marginBottom: 24, fontSize: 28}}>Contact Information</h3>
          
          {/* Contact Cards */}
          <div style={{display: 'grid', gap: 20}}>
            {/* Phone */}
            <motion.a
              href="tel:+233501326989"
              whileHover={{scale: 1.02}}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 20,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: 'linear-gradient(135deg, var(--accent), #ff4444)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24
              }}>📞</div>
              <div>
                <div style={{fontWeight: 700, marginBottom: 4, fontSize: 16}}>Emergency Hotline</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>+233 (0)501 326 989</div>
                <div style={{color: 'var(--muted)', fontSize: 13, marginTop: 4}}>+233 (0)204 001 146</div>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/233501326989"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{scale: 1.02}}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 20,
                background: 'rgba(37, 211, 102, 0.08)',
                borderRadius: 16,
                border: '1px solid rgba(37, 211, 102, 0.2)',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                color: '#fff'
              }}>💬</div>
              <div>
                <div style={{fontWeight: 700, marginBottom: 4, fontSize: 16}}>WhatsApp</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>Message us directly</div>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:info@ekgmotors.com"
              whileHover={{scale: 1.02}}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 20,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24
              }}>✉️</div>
              <div>
                <div style={{fontWeight: 700, marginBottom: 4, fontSize: 16}}>Email</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>info@ekgmotors.com</div>
              </div>
            </motion.a>

            {/* Location */}
            <motion.a
              href="https://maps.google.com/?q=5.603717,-0.186964"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{scale: 1.02}}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 20,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24
              }}>📍</div>
              <div>
                <div style={{fontWeight: 700, marginBottom: 4, fontSize: 16}}>Visit Our Showroom</div>
                <div style={{color: 'var(--muted)', fontSize: 15}}>123 Independence Avenue, Accra</div>
                <div style={{color: 'var(--accent)', fontSize: 13, marginTop: 4}}>View on Google Maps →</div>
              </div>
            </motion.a>
          </div>

          {/* Business Hours */}
          <div style={{
            marginTop: 32,
            padding: 24,
            background: 'rgba(212, 178, 106, 0.08)',
            borderRadius: 16,
            border: '1px solid rgba(212, 178, 106, 0.2)'
          }}>
            <h4 style={{marginBottom: 16, fontSize: 18}}>Business Hours</h4>
            <div style={{display: 'grid', gap: 8, color: 'var(--muted)', fontSize: 15}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Monday - Friday</span>
                <span style={{fontWeight: 600, color: 'var(--text)'}}>9:00 AM - 6:00 PM</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Saturday</span>
                <span style={{fontWeight: 600, color: 'var(--text)'}}>10:00 AM - 4:00 PM</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Sunday</span>
                <span style={{fontWeight: 600, color: 'var(--text)'}}>Closed</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div style={{marginTop: 32}}>
            <h4 style={{marginBottom: 16, fontSize: 18}}>Follow Us</h4>
            <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
              <a 
                href="https://instagram.com/ekgmotors" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, var(--accent), #ff4444)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span style={{fontSize: 20}}>📷</span>
                Instagram
              </a>
              <a 
                href="https://tiktok.com/@ekgmotors" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, var(--accent), #ff4444)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span style={{fontSize: 20}}>🎵</span>
                TikTok
              </a>
              <a 
                href="https://linkedin.com/company/ekgmotors" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, var(--accent), #ff4444)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span style={{fontSize: 20}}>💼</span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{
          padding: 32,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <h3 style={{marginBottom: 8, fontSize: 28}}>Send us a message</h3>
          <p style={{color: 'var(--muted)', marginBottom: 24}}>Fill out the form and we'll get back to you within 24 hours.</p>
          
          <form aria-label="Contact form" style={{display:'grid',gap:16}}>
            <div>
              <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14}} htmlFor="contact-name">Full Name</label>
              <input 
                id="contact-name" 
                name="name" 
                placeholder="John Doe" 
                required
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--text)',
                  fontSize: 15
                }}
              />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
              <div>
                <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14}} htmlFor="contact-email">Email</label>
                <input 
                  id="contact-email" 
                  name="email" 
                  type="email" 
                  placeholder="john@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: 14,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'var(--text)',
                    fontSize: 15
                  }}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14}} htmlFor="contact-phone">Phone</label>
                <input 
                  id="contact-phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="+233 24 000 0000"
                  style={{
                    width: '100%',
                    padding: 14,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'var(--text)',
                    fontSize: 15
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14}} htmlFor="contact-subject">Subject</label>
              <input 
                id="contact-subject" 
                name="subject" 
                placeholder="e.g., Test Drive Request"
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--text)',
                  fontSize: 15
                }}
              />
            </div>

            <div>
              <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14}} htmlFor="contact-message">Message</label>
              <textarea 
                id="contact-message" 
                name="message" 
                placeholder="Tell us how we can help you..."
                rows={6}
                required
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--text)',
                  fontSize: 15,
                  resize: 'vertical'
                }}
              />
            </div>

            <button 
              type="submit" 
              className="primary" 
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 12,
                background: 'linear-gradient(90deg, var(--accent), #ff4444)',
                border: 0,
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                marginTop: 8
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map Embed */}
      <div style={{marginTop: 60}}>
        <h3 style={{marginBottom: 20, fontSize: 28, textAlign: 'center'}}>Find Us</h3>
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7176489437!2d-0.18916!3d5.603717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMTMuNCJOIDDCsDExJzEzLjkiVw!5e0!3m2!1sen!2sgh!4v1234567890"
            width="100%" 
            height="450" 
            style={{border: 0, display: 'block'}} 
            allowFullScreen="" 
            loading="lazy"
            title="EKG Logistics and transport Location"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
