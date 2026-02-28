import React, { useState } from 'react'
import { saveOrder } from '../lib/orders'

export default function OrderForm({ item, onCancel, onSuccess }){
  const [form, setForm] = useState({ name:'', email:'', start:'', end:'', location:'', note:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function update(e){
    const { name, value } = e.target
    setForm(f => ({...f,[name]:value}))
  }

  async function submit(e){
    e.preventDefault()
    setError('')
    if(!form.name || !form.email || !form.start || !form.end){
      setError('Please fill name, email, and dates')
      return
    }
    setLoading(true)
    const order = saveOrder({
      productId: item.id,
      productName: item.name,
      price: item.price,
      ...form,
      createdAt: new Date().toISOString()
    })
    setLoading(false)
    if(onSuccess) onSuccess(order)
  }

  return (
    <form onSubmit={submit} style={{display:'grid',gap:10}} aria-label="Rental form">
      <div style={{display:'flex',gap:8}}>
        <input name="name" value={form.name} onChange={update} placeholder="Full name" style={{flex:1,padding:10,borderRadius:8}} />
        <input name="email" value={form.email} onChange={update} placeholder="Email" type="email" style={{flex:1,padding:10,borderRadius:8}} />
      </div>

      <div style={{display:'flex',gap:8}}>
        <input name="start" value={form.start} onChange={update} placeholder="Start date" type="date" style={{flex:1,padding:10,borderRadius:8}} />
        <input name="end" value={form.end} onChange={update} placeholder="End date" type="date" style={{flex:1,padding:10,borderRadius:8}} />
      </div>

      <input name="location" value={form.location} onChange={update} placeholder="Pickup location" style={{padding:10,borderRadius:8}} />
      <textarea name="note" value={form.note} onChange={update} placeholder="Additional requests" rows={3} style={{padding:10,borderRadius:8}} />

      {error && <div style={{color:'#ffb4b4'}}>{error}</div>}

      <div style={{marginTop:6,color:'var(--muted)',fontSize:13}}>Payment will be collected upon delivery — no online payment required.</div>

      <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:10}}>
        <button type="button" className="small" onClick={onCancel}>Cancel</button>
        <button className="primary" type="submit" disabled={loading}>{loading? 'Placing...' : `Place Rent Order`}</button>
      </div>
    </form>
  )
}
