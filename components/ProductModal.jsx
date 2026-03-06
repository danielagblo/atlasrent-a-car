import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import CldOptimizedImage from './CldOptimizedImage'
import OrderForm from './OrderForm'

export default function ProductModal({ item, onClose }) {
  const router = useRouter()
  const [ordering, setOrdering] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)

  if (!item) return null

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal" initial={{ scale: 0.98, y: 12 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
        <CldOptimizedImage
          width={800}
          height={500}
          src={item.image}
          alt={item.name}
          style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }}
        />
        <div>
          <h3>{item.name}</h3>
          <p>{item.desc}</p>

          {!ordering && !orderSuccess && (
            <div className="modal-actions">
              <span className="price">{item.price} GHS</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="small">More specs</button>
                <button className="primary" onClick={() => { onClose(); router.push(`/order/${item.id}`); }}>Book Now</button>
              </div>
            </div>
          )}

          {ordering && !orderSuccess && (
            <OrderForm item={item} onCancel={() => setOrdering(false)} onSuccess={(o) => { setOrderSuccess(o); setOrdering(false) }} />
          )}

          {orderSuccess && (
            <div style={{ marginTop: 12 }}>
              <h4 style={{ margin: '6px 0' }}>Order placed</h4>
              <p style={{ color: 'var(--muted)' }}>Your order <strong>#{orderSuccess.id}</strong> has been placed. We will contact you at <strong>{orderSuccess.email}</strong>.</p>
              <p style={{ color: 'var(--muted)', marginTop: 6 }}>Note: Payment will be collected upon delivery.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="small" onClick={onClose}>Close</button>
                <button className="primary" onClick={() => { onClose(); router.push('/my-orders'); }}>Track Orders</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
