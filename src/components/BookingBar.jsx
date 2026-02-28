import React, { useState } from 'react'

export default function BookingBar({ onSearch }){
  const [location, setLocation] = useState('Greater Accra')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  function submit(e){
    e.preventDefault()
    const payload = { location, from, to }
    if(onSearch) onSearch(payload)
    alert('Search: ' + JSON.stringify(payload))
  }

  return (
    <form className="booking-bar" onSubmit={submit} aria-label="Search bookings" style={{
      display: 'flex',
      gap: 12,
      background: 'rgba(255,255,255,0.95)',
      padding: 12,
      borderRadius: 999,
      alignItems: 'center',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      maxWidth: 760,
      margin: '0 auto',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="booking-field" style={{ flex: 1 }}>
        <label className="visually-hidden">Location</label>
        <input 
          value={location} 
          onChange={e=>setLocation(e.target.value)} 
          placeholder="Location"
          style={{
            border: 0,
            padding: '12px 16px',
            borderRadius: 12,
            background: 'rgba(0,0,0,0.04)',
            width: '100%',
            fontSize: 15
          }}
        />
      </div>
      <div className="booking-field" style={{ flex: 1 }}>
        <label className="visually-hidden">From</label>
        <input 
          type="date" 
          value={from} 
          onChange={e=>setFrom(e.target.value)}
          style={{
            border: 0,
            padding: '12px 16px',
            borderRadius: 12,
            background: 'rgba(0,0,0,0.04)',
            width: '100%',
            fontSize: 15
          }}
        />
      </div>
      <div className="booking-field" style={{ flex: 1 }}>
        <label className="visually-hidden">To</label>
        <input 
          type="date" 
          value={to} 
          onChange={e=>setTo(e.target.value)}
          style={{
            border: 0,
            padding: '12px 16px',
            borderRadius: 12,
            background: 'rgba(0,0,0,0.04)',
            width: '100%',
            fontSize: 15
          }}
        />
      </div>
      <button 
        className="primary" 
        type="submit"
        style={{
          padding: '12px 28px',
          borderRadius: 999,
          background: 'linear-gradient(90deg, var(--accent), #ff4444)',
          border: 0,
          color: '#fff',
          fontWeight: 700,
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(184, 144, 51, 0.3)'
        }}
      >
        Search
      </button>
    </form>
  )
}
