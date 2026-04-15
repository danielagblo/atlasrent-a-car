import React from 'react'
import Products from '../../components/Products'
import Layout from '../../components/Layout'

export default function VehiclesPage() {
  return (
    <Layout>
      <div style={{ padding: '0 0 60px' }}>
        <Products />
      </div>
    </Layout>
  )
}
