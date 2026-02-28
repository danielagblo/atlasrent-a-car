import React, { useEffect, useState } from 'react'
import { getOrders, clearOrders, fetchServerOrders, replaceLocalOrders } from '../lib/orders'
import { apiUrl } from '../lib/api'

function OrderRow({ o, isMobile }){
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState('')

  async function sendEmail(){
    setMsg('')
    setSending(true)
    try{
      const resp = await fetch(apiUrl(`/api/invoice/${o.id}/email`), { method: 'POST' })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'Failed')
      setMsg('Email sent')
    }catch(e){
      setMsg('Email service unavailable')
    }
    setSending(false)
  }

  const createdAt = o.createdAt ? new Date(o.createdAt).toLocaleString() : 'Unknown time'

  return (
    <div style={{padding: isMobile ? 12 : 16, borderRadius:12, background:'rgba(255,255,255,0.02)', display: isMobile ? 'block' : 'flex', justifyContent:'space-between', alignItems: isMobile ? 'flex-start' : 'center'}}>
      <div>
        <div style={{fontWeight:700}}>{o.productName} <span style={{color:'var(--muted)',fontWeight:400}}>— {o.price}</span></div>
        <div style={{color:'var(--muted)',fontSize:13}}>Booked by {o.name} • {createdAt}</div>
      </div>
      <div style={{textAlign: isMobile ? 'left' : 'right', marginTop: isMobile ? 12 : 0}}>
        <div style={{color:'var(--muted)'}}>From {o.start} to {o.end}</div>
        <div style={{marginTop:8}}><small>{o.location}</small></div>
        <div style={{marginTop:8,color:'var(--muted)',fontSize:13}}>Payment: <strong>On delivery</strong></div>
        <div style={{marginTop:10,display:'flex',gap:8,justifyContent:'flex-end'}}>
          <a href={apiUrl(`/api/invoice/${o.id}`)} target="_blank" rel="noreferrer" className="small" style={{textDecoration:'none'}}>Download Invoice</a>
          <button className="small" onClick={sendEmail} disabled={sending}>{sending? 'Sending...' : 'Email Invoice'}</button>
        </div>
        {msg && <div style={{color:'var(--muted)',marginTop:8}}>{msg}</div>}
      </div>
    </div>
  )
}

export default function Orders(){
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let mounted = true

    ;(async () => {
      const local = getOrders()
      if (mounted) setOrders(local)

      const server = await fetchServerOrders()
      if (!mounted) return

      if (server) {
        setOrders(server)
        replaceLocalOrders(server)
      } else if (local.length > 0) {
        setStatus('Showing local orders. Backend is not reachable.')
      } else {
        setStatus('No orders found yet.')
      }
    })()

    return () => { mounted = false }
  }, [])

  return (
    <section style={{padding: isMobile ? '40px 20px' : 60}}>
      <h2 style={{fontSize: isMobile ? 28 : 36}}>Your Orders</h2>
      {status && <p style={{color:'var(--muted)'}}>{status}</p>}
      {orders.length===0 && <p style={{color:'var(--muted)'}}>No orders yet. Browse models and place a rent request.</p>}
      <div style={{display:'grid',gap:12,marginTop:20}}>
        {orders.map(o => (
          <OrderRow key={o.id} o={o} isMobile={isMobile} />
        ))}
      </div>

      {orders.length>0 && (
        <div style={{marginTop:22}}>
          <button className="small" onClick={()=>{ clearOrders(); setOrders([]) }}>Clear demo orders</button>
        </div>
      )}
    </section>
  )
}
