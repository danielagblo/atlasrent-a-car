import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutDashboard,
  ShoppingCart,
  Box,
  Newspaper,
  MessageSquare,
  ChevronRight,
  LogOut,
  Settings,
  Sun,
  Moon
} from 'lucide-react'

export default function AdminLayout({ title, children }) {
  const router = useRouter()
  const path = router?.pathname || ''
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin_theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('admin_theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  function handleLogout(e) {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
      router.push('/admin/login')
    }
  }

  const nav = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/admin/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { href: '/admin/vehicles', label: 'Vehicles', icon: <Box size={20} /> },
    { href: '/admin/news', label: 'Blog Feed', icon: <Newspaper size={20} /> },
    { href: '/admin/testimonials', label: 'Reviews', icon: <MessageSquare size={20} /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> }
  ]

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar" style={{ background: '#080810', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="sidebar-logo-area" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '32px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="sidebar-logo" style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.05em', color: '#fff' }}>ATLAS <span style={{ color: '#DF9738', fontWeight: 400 }}>RENT-A-CAR</span></div>
          <div className="admin-badge" style={{ background: 'rgba(223, 151, 56, 0.1)', color: '#DF9738', fontSize: 10, fontWeight: 900, padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(223, 151, 56, 0.2)' }}>PORTAL</div>
        </div>

        <div className="sidebar-scrollable-section" style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
          <div className="sidebar-section-label">Management</div>
          <nav className="admin-nav">
            {nav.map(item => {
              const isActive = path === item.href
              return (
                <Link key={item.href} href={item.href} className={isActive ? 'active' : ''}>

                  <div style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', transition: '0.3s' }}>{item.icon}</div>
                  <span style={{ fontWeight: isActive ? 700 : 500, fontSize: 14 }}>{item.label}</span>

                </Link>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '12px 16px' }}>
            <div className="user-avatar" style={{ background: '#DF9738', color: '#fff', fontWeight: 800, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: 13 }}>AD</div>
            <div className="user-info">
              <div className="user-role" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Administrator</div>
            </div>
            <button
              onClick={handleLogout}
              style={{ padding: 10, background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.2)', borderRadius: 12, color: '#FF3B30', cursor: 'pointer', display: 'flex', transition: '0.3s' }}
              className="logout-btn"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <div className="breadcrumb">
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, color: 'var(--primary-gold)' }}>Atlas Logistics</span>
            <ChevronRight size={14} style={{ opacity: 0.3, margin: '0 4px' }} />
            <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: 15 }}>{title}</span>
          </div>

          <div className="header-right">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                padding: '10px 18px',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'all 0.3s ease'
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </span>
            </button>
            <div className="divider" style={{ opacity: 0.1, background: 'var(--text-primary)' }}></div>
            <div className="user-avatar" style={{ width: 44, height: 44, fontSize: 12, borderRadius: 14, background: '#24276F', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>AD</div>
          </div>
        </header>

        <main className="admin-content-wrapper">
          {children}
        </main>
      </div>
    </div>
  );
}
