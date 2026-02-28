import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} EKG Logistics and transport</div>
        <div className="socials" style={{display:'flex',gap:16,alignItems:'center'}}>
          <span>Follow us:</span>
          <a href="https://instagram.com/ekgmotors" target="_blank" rel="noopener noreferrer" style={{color:'var(--text)',textDecoration:'none'}}>Instagram</a>
          <a href="https://tiktok.com/@ekgmotors" target="_blank" rel="noopener noreferrer" style={{color:'var(--text)',textDecoration:'none'}}>TikTok</a>
          <a href="https://linkedin.com/company/ekg-motors" target="_blank" rel="noopener noreferrer" style={{color:'var(--text)',textDecoration:'none'}}>LinkedIn</a>
        </div>
      </div>
      <div style={{textAlign:'center',padding:'12px 0',borderTop:'1px solid rgba(0,0,0,0.08)',marginTop:12,fontSize:13,color:'var(--muted)'}}>
        Designed by <a href="https://bricsky.com" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600}}>Bricsky</a>
      </div>
    </footer>
  )
}
