import React from 'react'
import Products from '../../components/Products'
import Layout from '../../components/Layout'

export default function VehiclesPage() {
  return (
    <Layout>
      <div style={{ paddingTop: 100, paddingBottom: 60 }}>
        <Products />
      </div>
    </Layout>
  )
}
