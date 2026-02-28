import React from 'react'

export default function Admin(){
  return (
    <section style={{padding:'56px 24px',maxWidth:1000,margin:'0 auto'}}>
      <h2 style={{marginBottom:12}}>Admin Portal</h2>
      <p style={{color:'var(--muted)',marginBottom:20,lineHeight:1.6}}>
        The admin dashboard now runs as a dedicated Next.js app for order and invoice management.
      </p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))',gap:16}}>
        <div style={{background:'var(--surface)',border:'1px solid rgba(16,24,40,0.08)',borderRadius:14,padding:18}}>
          <h3 style={{marginBottom:8}}>Open Dashboard</h3>
          <p style={{color:'var(--muted)',marginBottom:14}}>Launch the full admin interface.</p>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="primary"
            style={{display:'inline-block',padding:'10px 14px',borderRadius:10,textDecoration:'none'}}
          >
            Go to Admin App
          </a>
        </div>

        <div style={{background:'var(--surface)',border:'1px solid rgba(16,24,40,0.08)',borderRadius:14,padding:18}}>
          <h3 style={{marginBottom:8}}>Backend API</h3>
          <p style={{color:'var(--muted)',marginBottom:14}}>Order API for dashboard data and invoice actions.</p>
          <a
            href="http://localhost:4000/api/orders"
            target="_blank"
            rel="noreferrer"
            className="small"
            style={{display:'inline-block',padding:'10px 14px',borderRadius:10,textDecoration:'none'}}
          >
            View Orders JSON
          </a>
        </div>
      </div>

      <div style={{marginTop:20,background:'var(--surface)',border:'1px solid rgba(16,24,40,0.08)',borderRadius:14,padding:18}}>
        <h3 style={{marginBottom:8}}>Run Commands</h3>
        <p style={{color:'var(--muted)',marginBottom:8}}>From project root:</p>
        <pre style={{margin:0,whiteSpace:'pre-wrap',fontSize:14,lineHeight:1.6,color:'var(--text)'}}>
npm run server
npm run admin
        </pre>
      </div>
    </section>
  )
}
