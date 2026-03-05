import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { Search, ShoppingBag, Calendar, Mail, Phone, Link as LinkIcon, Trash2, Box, CheckCircle2 } from 'lucide-react'
import { getLinkedContacts, saveContact } from '../lib/orders'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'

export default function MyOrders() {
    const [seeds, setSeeds] = useState([])
    const [orders, setOrders] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [inputValue, setInputValue] = useState('')

    // Load initial linked contacts
    useEffect(() => {
        setSeeds(getLinkedContacts())
    }, [])

    // The core fetcher that finds all linked orders
    const refreshOrders = useCallback(async (currentSeeds) => {
        if (!currentSeeds || currentSeeds.length === 0) {
            setOrders([])
            return
        }

        setLoading(true)
        setError('')

        let processedSeeds = [...currentSeeds]
        let allOrders = []
        let seenOrderIds = new Set()
        let iteration = 0
        let hasNewSeeds = true

        try {
            while (hasNewSeeds && iteration < 5) {
                iteration++
                hasNewSeeds = false

                const results = await Promise.all(
                    processedSeeds.map(s =>
                        fetch(`/api/my-orders?contact=${encodeURIComponent(s)}`).then(r => r.ok ? r.json() : [])
                    )
                )

                const flat = results.flat()
                flat.forEach(o => {
                    if (!seenOrderIds.has(o.id)) {
                        allOrders.push(o)
                        seenOrderIds.add(o.id)

                        // Link discovery: if this order has an email/phone we don't know, add it
                        if (o.email && !processedSeeds.includes(o.email)) {
                            processedSeeds.push(o.email)
                            saveContact(o.email)
                            hasNewSeeds = true
                        }
                        if (o.phone && !processedSeeds.includes(o.phone)) {
                            const cleanPhone = o.phone.replace(/\s+/g, '')
                            if (!processedSeeds.includes(cleanPhone)) {
                                processedSeeds.push(cleanPhone)
                                saveContact(cleanPhone)
                                hasNewSeeds = true
                            }
                        }
                    }
                })
            }

            setSeeds(processedSeeds)
            setOrders(allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        } catch (err) {
            setError('System unavailable. Please try again later.')
        } finally {
            setLoading(false)
        }
    }, [])

    // Fetch when seeds change (on mount or after new search)
    useEffect(() => {
        if (seeds.length > 0 && orders === null) {
            refreshOrders(seeds)
        }
    }, [seeds, orders, refreshOrders])

    const handleManualAdd = (e) => {
        if (e) e.preventDefault()
        const val = inputValue.trim()
        if (!val) return

        if (!seeds.includes(val)) {
            const newSeeds = [...seeds, val]
            saveContact(val)
            setSeeds(newSeeds)
            refreshOrders(newSeeds)
        }
        setInputValue('')
    }

    const removeContact = (c) => {
        const newSeeds = seeds.filter(s => s !== c)
        if (typeof window !== 'undefined') {
            localStorage.setItem('ekg_linked_contacts_v1', JSON.stringify(newSeeds))
        }
        setSeeds(newSeeds)
        setOrders(null)
    }

    return (
        <Layout>
            <Head>
                <title>Order History | EKG Luxury Rentals</title>
            </Head>

            <div className="my-orders-page" style={{
                padding: '100px 20px',
                minHeight: '100vh',
                background: '#0a0a0a',
                color: '#fff',
                backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 40%)'
            }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginBottom: 60, textAlign: 'center' }}
                    >
                        <div style={{ fontSize: 12, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, marginBottom: 12 }}>Your Concierge</div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>Order History</h1>
                        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>Manage your executive fleet rentals and view all confirmed bookings across your various profiles.</p>
                    </motion.header>

                    {/* Discovery Dashboard */}
                    <div style={{ display: 'grid', gridTemplateColumns: seeds.length > 0 ? '300px 1fr' : '1fr', gap: 40 }}>

                        {/* Linked Identifiers Panel */}
                        {seeds.length > 0 && (
                            <motion.aside
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    padding: 24,
                                    borderRadius: 24,
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    height: 'fit-content',
                                    position: 'sticky',
                                    top: 100
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                    <LinkIcon size={16} style={{ color: '#D4AF37' }} />
                                    <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Linked Profiles</h3>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {seeds.map(s => (
                                        <div key={s} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '12px 14px',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: 12,
                                            fontSize: 13,
                                            color: 'rgba(255,255,255,0.9)',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                {s.includes('@') ? <Mail size={14} style={{ opacity: 0.5 }} /> : <Phone size={14} style={{ opacity: 0.5 }} />}
                                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{s}</span>
                                            </div>
                                            <button
                                                onClick={() => removeContact(s)}
                                                style={{ border: 'none', background: 'none', color: '#ff4444', cursor: 'pointer', padding: 4, opacity: 0.7 }}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}

                                    <form onSubmit={handleManualAdd} style={{ marginTop: 10 }}>
                                        <input
                                            type="text"
                                            placeholder="+ Add email/phone"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            style={{
                                                width: '100%',
                                                border: '1px dashed rgba(255,255,255,0.1)',
                                                background: 'transparent',
                                                borderRadius: 12,
                                                padding: '12px 14px',
                                                fontSize: 13,
                                                color: '#fff',
                                                outline: 'none',
                                            }}
                                        />
                                    </form>
                                </div>
                            </motion.aside>
                        )}

                        <div style={{ flex: 1 }}>
                            {/* Empty State / Discovery Initiation */}
                            {seeds.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        padding: '80px 40px',
                                        background: 'rgba(255,255,255,0.01)',
                                        borderRadius: 32,
                                        textAlign: 'center',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    <div style={{
                                        width: 80, height: 80,
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 32px'
                                    }}>
                                        <ShoppingBag size={32} style={{ color: '#D4AF37' }} />
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Find Your Legacy</h2>
                                    <p style={{ color: 'var(--muted)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.6 }}>
                                        Enter any email or phone number used during your EKG Luxury bookings. We will automatically link and secure your entire fleet history.
                                    </p>
                                    <form onSubmit={handleManualAdd} style={{ maxWidth: 500, margin: '0 auto', display: 'flex', gap: 12 }}>
                                        <div style={{ position: 'relative', flex: 1 }}>
                                            <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} size={20} />
                                            <input
                                                type="text"
                                                placeholder="Email or phone number"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '18px 20px 18px 52px',
                                                    borderRadius: 16,
                                                    background: 'rgba(255,255,255,0.03)',
                                                    border: '1px solid rgba(212, 175, 55, 0.2)',
                                                    fontSize: 16,
                                                    color: '#fff',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            style={{
                                                padding: '0 32px',
                                                borderRadius: 16,
                                                background: 'linear-gradient(135deg, #D4AF37, #FCEABB)',
                                                color: '#000',
                                                fontWeight: 800,
                                                border: 'none',
                                                cursor: 'pointer',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}
                                        >
                                            Link
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* Loading State */}
                            {loading && (
                                <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: 12 }}>
                                        <LinkIcon size={24} />
                                    </motion.div>
                                    <div style={{ fontSize: 14 }}>Retrieving secure rental records...</div>
                                </div>
                            )}

                            {/* Error State */}
                            {error && <div style={{ color: '#ff4444', textAlign: 'center', padding: 20 }}>{error}</div>}

                            {/* Results */}
                            {orders && orders.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ display: 'grid', gap: 24 }}
                                >
                                    {orders.map((order, idx) => (
                                        <motion.div
                                            key={order.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            whileHover={{ y: -4 }}
                                            style={{
                                                background: 'rgba(15,15,15,0.8)',
                                                borderRadius: 24,
                                                padding: 32,
                                                border: '1px solid rgba(255,255,255,0.06)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                                            }}
                                        >
                                            <div style={{
                                                position: 'absolute', top: 0, right: 0,
                                                padding: '10px 20px',
                                                background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(74, 222, 128, 0.02))',
                                                color: '#4ade80',
                                                fontSize: 11,
                                                fontWeight: 800,
                                                borderBottomLeftRadius: 16,
                                                letterSpacing: '0.1em',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                border: '1px solid rgba(74, 222, 128, 0.1)',
                                                borderTop: 'none',
                                                borderRight: 'none'
                                            }}>
                                                <CheckCircle2 size={12} /> CONFIRMED
                                            </div>

                                            <div style={{ marginBottom: 32 }}>
                                                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                                                    Order Reference <span style={{ color: '#fff' }}>#{order.id}</span>
                                                </div>
                                                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>{order.productName || 'Executive Transport'}</h3>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 32 }}>
                                                <div>
                                                    <h4 style={{ fontSize: 11, fontWeight: 700, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Contact Record</h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                                                            <Mail size={16} strokeWidth={1.5} /> <span>{order.email}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                                                            <Phone size={16} strokeWidth={1.5} /> <span>{order.phone}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: 11, fontWeight: 700, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Itinerary</h4>
                                                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>
                                                        <div style={{ marginBottom: 6 }}>
                                                            <Calendar size={14} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
                                                            {order.start} to {order.end}
                                                        </div>
                                                        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                                                            📍 {order.location || 'Accra Metropolitan Area'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, fontWeight: 600 }}>Total Value</div>
                                                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', fontStyle: 'italic' }}> ${order.price}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Empty Search results */}
                            {orders && orders.length === 0 && seeds.length > 0 && !loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ textAlign: 'center', padding: '100px 40px', background: 'rgba(255,255,255,0.01)', borderRadius: 32, border: '1px dashed rgba(255,255,255,0.1)' }}
                                >
                                    <Box size={40} style={{ color: 'rgba(255,255,255,0.1)', marginBottom: 20, margin: '0 auto 20px' }} />
                                    <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>We couldn't find any confirmed luxury rentals linked to these profiles.</p>
                                    <button
                                        onClick={() => { setSeeds([]); localStorage.removeItem('ekg_linked_contacts_v1'); }}
                                        style={{ marginTop: 24, color: '#D4AF37', background: 'none', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '10px 24px', borderRadius: 999, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
                                    >
                                        Clear History & Start Fresh
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
