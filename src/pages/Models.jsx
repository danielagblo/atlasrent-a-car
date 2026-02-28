import React from 'react'
import Products from '../components/Products'

export default function Models(){
  return (
    <section className="page page-models">
      <div style={{padding:60}}>
        <h2>Models</h2>
        <p style={{color:'var(--muted)'}}>Explore our full lineup.</p>
        <Products />
      </div>
    </section>
  )
}
