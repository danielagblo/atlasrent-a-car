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
  Zap,
  ChevronRight
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [counts, setCounts] = React.useState({ orders: 0, vehicles: 0, news: 0, testimonials: 0 })

  React.useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) { router.replace('/admin/login'); return }

    let mounted = true
      ; (async () => {
        try {
          const [oRes, mRes, nRes, tRes] = await Promise.all([
            fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` } }),
            fetch('/api/vehicles', { headers: { Authorization: `Bearer ${token}` } }),
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
            vehicles: Array.isArray(m) ? m.length : 0,
            news: Array.isArray(n) ? n.length : 0,
            testimonials: Array.isArray(t) ? t.length : 0
          })
        } catch (e) { if (mounted) setError(e.message || String(e)) }
        if (mounted) setLoading(false)
      })()

    return () => { mounted = false }
  }, [router])

  const stats = [
    { label: 'Total Orders', value: counts.orders, icon: <ShoppingBag size={24} />, color: '#DF9738', bg: 'rgba(223,151,56,0.1)', href: '/admin/orders', trend: '+12%', up: true },
    { label: 'Fleet Vehicles', value: counts.vehicles, icon: <Box size={24} />, color: '#24276F', bg: 'rgba(36,39,111,0.05)', href: '/admin/vehicles', trend: '+2', up: true },
    { label: 'Blog Posts', value: counts.news, icon: <Newspaper size={24} />, color: '#24276F', bg: 'rgba(36,39,111,0.05)', href: '/admin/news', trend: 'Updated', up: true },
    { label: 'Client Reviews', value: counts.testimonials, icon: <MessageSquare size={24} />, color: '#24276F', bg: 'rgba(36,39,111,0.05)', href: '/admin/testimonials', trend: 'Active', up: true }
  ]

  return (
    <AdminLayout title="Dashboard Overview">
      <div style={{ padding: '0 0 40px' }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 12 }}>
           <div style={{ width: 4, height: 48, background: '#DF9738' }} />
           <div>
              <h1 style={{ fontSize: 32, fontWeight: 900, color: '#24276F', margin: 0, letterSpacing: '-0.02em' }}>Welcome, Administrator</h1>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: 14, fontWeight: 600 }}>Command center for Atlas Rent-A-Car Global Headquarters.</p>
           </div>
        </div>
      </div>

      {loading && <div style={{ padding: 80, textAlign: 'center', color: '#94a3b8', fontWeight: 700 }}>Archiving system metrics...</div>}
      {error && <div style={{ color: '#FF3B30', background: 'rgba(255,59,48,0.05)', padding: 20, borderRadius: 12, border: '1px solid rgba(255,59,48,0.1)', marginBottom: 32 }}>{error}</div>}

      {!loading && !error && (
        <div style={{ display: 'grid', gap: 40 }}>
          
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                onClick={() => router.push(stat.href)}
                style={{
                  padding: 32,
                  borderRadius: 24,
                  background: '#fff',
                  border: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
                className="hover-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: stat.up ? '#10b981' : '#ef4444', fontSize: 12, fontWeight: 900, background: '#f8fafc', padding: '6px 12px', borderRadius: 99 }}>
                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>{stat.label}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: '#24276F' }}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
            
            {/* Recent Ledger */}
            <div style={{ padding: 40, background: '#fff', borderRadius: 32, border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Activity size={22} style={{ color: '#DF9738' }} />
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#24276F' }}>System Activity</h3>
                </div>
                <button style={{ fontSize: 13, fontWeight: 900, color: '#DF9738', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                   VIEW ALL <ChevronRight size={14} />
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: 0 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '24px 0', borderBottom: i === 3 ? 'none' : '1px solid #f1f5f9' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Calendar size={18} style={{ color: '#94a3b8' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#24276F' }}>New lease inquiry for Range Rover Autobiography</div>
                      <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{i * 2}h ago • Customer ID: #ATL-{i}92</div>
                    </div>
                    <ArrowRight size={18} style={{ color: '#e2e8f0' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Network Health */}
            <div style={{ padding: 40, background: '#24276F', borderRadius: 32, color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
                <Zap size={22} style={{ color: '#DF9738' }} />
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#fff' }}>Core Systems</h3>
              </div>
              
              <div style={{ display: 'grid', gap: 20 }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                   <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>API Status</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }} />
                      <span style={{ fontSize: 16, fontWeight: 800 }}>Primary Node Active</span>
                   </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                   <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Cloud Database</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }} />
                      <span style={{ fontSize: 16, fontWeight: 800 }}>Atlas Cluster Synced</span>
                   </div>
                </div>

                <button 
                  onClick={() => router.push('/admin/settings')}
                  style={{ width: '100%', padding: '16px', background: '#DF9738', color: '#fff', border: 'none', borderRadius: 16, fontWeight: 900, fontSize: 14, cursor: 'pointer', marginTop: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                   Global Settings
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
