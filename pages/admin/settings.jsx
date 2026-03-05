import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { Save, Mail, Phone, BellRing, Info } from 'lucide-react'

export default function AdminSettings() {
    const router = useRouter()
    const [settings, setSettings] = useState({
        adminEmail: '',
        fromEmail: '',
        adminSmsNumber: '',
        supportPhone: '',
        featuredBrands: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
        if (!token) {
            router.replace('/admin/login')
            return
        }
        fetchSettings()
    }, [router])

    async function fetchSettings() {
        const token = localStorage.getItem('admin_token')
        try {
            const res = await fetch('/api/admin/settings', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.status === 401) {
                localStorage.removeItem('admin_token')
                router.replace('/admin/login')
                return
            }
            if (res.ok) {
                const data = await res.json()
                setSettings({
                    adminEmail: data.adminEmail || '',
                    fromEmail: data.fromEmail || '',
                    adminSmsNumber: data.adminSmsNumber || '',
                    supportPhone: data.supportPhone || '+233 (0)501 326 989',
                    featuredBrands: data.featuredBrands || 'Toyota, Honda, Nissan, Hyundai'
                })
            }
        } catch (e) {
            console.error('Failed to fetch settings', e)
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(e) {
        if (e) e.preventDefault()
        setSaving(true)
        setMessage(null)

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
                },
                body: JSON.stringify(settings)
            })

            if (res.status === 401) {
                localStorage.removeItem('admin_token')
                router.replace('/admin/login')
                return
            }

            if (res.ok) {
                setMessage({ type: 'success', text: 'Settings updated successfully!' })
            } else {
                setMessage({ type: 'error', text: 'Failed to update settings.' })
            }
        } catch (e) {
            setMessage({ type: 'error', text: 'An error occurred.' })
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <AdminLayout title="Settings">
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading system configuration...</div>
    </AdminLayout>

    return (
        <AdminLayout title="Global Settings">
            <div style={{ maxWidth: 840 }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                    {/* Email Settings Section */}
                    <section style={{ background: 'var(--bg-card)', padding: 40, borderRadius: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(227, 6, 19, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                                <Mail size={22} />
                            </div>
                            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>Email Infrastructure</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 12, fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Recipient Address
                                </label>
                                <input
                                    type="email"
                                    value={settings.adminEmail}
                                    onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                                    placeholder="admin@ekgsite.com"
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: 16,
                                        border: '1px solid var(--border)',
                                        background: 'var(--input-bg)',
                                        color: 'var(--text-primary)',
                                        fontSize: 15,
                                        outline: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, display: 'block', opacity: 0.6 }}>
                                    Order alerts will be routed here.
                                </span>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 12, fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Outbound Alias
                                </label>
                                <input
                                    type="email"
                                    value={settings.fromEmail}
                                    onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
                                    placeholder="no-reply@ekgsite.com"
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: 16,
                                        border: '1px solid var(--border)',
                                        background: 'var(--input-bg)',
                                        color: 'var(--text-primary)',
                                        fontSize: 15,
                                        outline: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, display: 'block', opacity: 0.6 }}>
                                    Sender identity for customer emails.
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Communication Settings Section */}
                    <section style={{ background: 'var(--bg-card)', padding: 40, borderRadius: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(227, 6, 19, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                                <Phone size={22} />
                            </div>
                            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>Support & Alerts</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 12, fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Admin Alert Line
                                </label>
                                <input
                                    type="tel"
                                    value={settings.adminSmsNumber}
                                    onChange={(e) => setSettings({ ...settings, adminSmsNumber: e.target.value })}
                                    placeholder="+233..."
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: 16,
                                        border: '1px solid var(--border)',
                                        background: 'var(--input-bg)',
                                        color: 'var(--text-primary)',
                                        fontSize: 15,
                                        outline: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, display: 'block', opacity: 0.6 }}>
                                    Mobile alerts for instant order tracking.
                                </span>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 12, fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    24/7 Duty Line
                                </label>
                                <input
                                    type="tel"
                                    value={settings.supportPhone}
                                    onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                                    placeholder="+233 (0)501 326 989"
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: 16,
                                        border: '1px solid var(--border)',
                                        background: 'var(--input-bg)',
                                        color: 'var(--text-primary)',
                                        fontSize: 15,
                                        outline: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, display: 'block', opacity: 0.6 }}>
                                    Displayed on public invoices and booking.
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Fleet Branding Section */}
                    <section style={{ background: 'var(--bg-card)', padding: 40, borderRadius: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                                <Info size={22} />
                            </div>
                            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>Fleet Management</h3>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 12, fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Core Partners & Brands
                            </label>
                            <input
                                type="text"
                                value={settings.featuredBrands}
                                onChange={(e) => setSettings({ ...settings, featuredBrands: e.target.value })}
                                placeholder="Toyota, Honda, Nissan, Hyundai"
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    borderRadius: 16,
                                    border: '1px solid var(--border)',
                                    background: 'var(--input-bg)',
                                    color: 'var(--text-primary)',
                                    fontSize: 15,
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, display: 'block', opacity: 0.6 }}>
                                Brands listed in the public About page footer.
                            </span>
                        </div>
                    </section>

                    {message && (
                        <div style={{
                            padding: '16px 24px',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 700,
                            background: message.type === 'success' ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)',
                            border: `1px solid ${message.type === 'success' ? 'rgba(52, 199, 89, 0.2)' : 'rgba(255, 59, 48, 0.2)'}`,
                            color: message.type === 'success' ? '#34C759' : '#FF3B30'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20 }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                            style={{ height: 56, padding: '0 40px', fontSize: 16, fontWeight: 900 }}
                        >
                            <Save size={20} />
                            {saving ? 'UPDATING...' : 'SAVE CONFIGURATION'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}

AdminSettings.noLayout = true
