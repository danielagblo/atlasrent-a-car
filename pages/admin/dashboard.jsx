import React from 'react'
import { useRouter } from 'next/router'
import {
  ShoppingBag,
  Box,
  Newspaper,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  TrendingDown,
  ArrowDownRight,
  ArrowRight,
  Activity,
  Calendar,
  Zap
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [counts, setCounts] = React.useState({ orders: 0, models: 0, news: 0, testimonials: 0 })

  React.useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) { router.replace('/admin/login'); return }

    let mounted = true
      ; (async () => {
        try {
          const [oRes, mRes, nRes, tRes] = await Promise.all([
            fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` } }),
            fetch('/api/models', { headers: { Authorization: `Bearer ${token}` } }),
            fetch('/api/news', { headers: { Authorization: `Bearer ${token}` } }),
            fetch('/api/testimonials', { headers: { Authorization: `Bearer ${token}` } })
          ])

          if (oRes.status === 401 || mRes.status === 401 || nRes.status === 401 || tRes.status === 401) {
            localStorage.removeItem('admin_token')
            router.replace('/admin/login')
            return
          }

          const [o, m, n, t] = await Promise.all([
            oRes.ok ? oRes.json() : [],
            mRes.ok ? mRes.json() : [],
            nRes.ok ? nRes.json() : [],
            tRes.ok ? tRes.json() : []
          ])
          if (mounted) setCounts({
            orders: Array.isArray(o) ? o.length : 0,
            models: Array.isArray(m) ? m.length : 0,
            news: Array.isArray(n) ? n.length : 0,
            testimonials: Array.isArray(t) ? t.length : 0
          })
        } catch (e) { if (mounted) setError(e.message || String(e)) }
        if (mounted) setLoading(false)
      })()

    return () => { mounted = false }
  }, [router])

  const stats = [
    { label: 'Total Orders', value: counts.orders, icon: <ShoppingBag size={24} />, color: 'var(--primary)', bg: 'rgba(227, 6, 19, 0.15)', href: '/admin/orders', trend: '+12%', up: true },
    { label: 'Fleet Vehicles', value: counts.models, icon: <Box size={24} />, color: 'var(--text-primary)', bg: 'var(--glass)', href: '/admin/vehicles', trend: '+2', up: true },
    { label: 'News Articles', value: counts.news, icon: <Newspaper size={24} />, color: 'var(--text-primary)', bg: 'var(--glass)', href: '/admin/news', trend: 'Updated', up: true },
    { label: 'Testimonials', value: counts.testimonials, icon: <MessageSquare size={24} />, color: 'var(--text-primary)', bg: 'var(--glass)', href: '/admin/testimonials', trend: 'Active', up: true }
  ]

  return (
    <AdminLayout title="Dashboard">
      <div className="page-header">
        <h1 className="page-title">Welcome back, Admin!</h1>
        <p className="page-subtitle">Here's a quick overview of your fleet and latest activity.</p>
      </div>

      {loading && <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading Dashboard...</div>}
      {error && <div className="danger" style={{ marginBottom: 24, padding: 12, border: '1px solid var(--border)', borderRadius: 12 }}>{error}</div>}

      {!loading && !error && (
        <div style={{ display: 'grid', gap: 32 }}>
          {/* Stats Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                onClick={() => router.push(stat.href)}
                className="dashboard-stat-card"
                style={{
                  padding: 32,
                  borderRadius: 24,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, border: '1px solid var(--border)' }}>
                    {stat.icon}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: stat.up ? '#34C759' : '#FF3B30', fontSize: 13, fontWeight: 800, background: 'var(--glass)', padding: '6px 12px', borderRadius: 99 }}>
                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{stat.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid-bottom" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
            {/* Quick Actions / Recent Activity Placeholder */}
            <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
                <Activity size={24} style={{ color: 'var(--primary)' }} />
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>Recent Activity</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '16px 0', borderBottom: i === 3 ? 'none' : '1px solid var(--border)' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                      <Calendar size={20} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>New order received for Range Rover</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{i * 2} hours ago • by Customer #A{i}2F</div>
                    </div>
                    <ArrowRight size={18} style={{ color: 'var(--border)' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 28, color: 'var(--text-primary)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
                <Zap size={24} style={{ color: '#FFD60A' }} />
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>System Health</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ background: 'var(--glass)', padding: 20, borderRadius: 16, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>API Core</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#34C759', boxShadow: '0 0 15px rgba(52, 199, 89, 0.4)' }}></div>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Operational</span>
                  </div>
                </div>
                <div style={{ background: 'var(--glass)', padding: 20, borderRadius: 16, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Primary Database</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#34C759', boxShadow: '0 0 15px rgba(52, 199, 89, 0.4)' }}></div>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Connected</span>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: 8 }}
                  onClick={() => router.push('/admin/settings')}
                >
                  Configure System
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

AdminDashboard.noLayout = true
