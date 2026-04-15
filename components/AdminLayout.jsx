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
  Settings
} from 'lucide-react'

export default function AdminLayout({ title, children }) {
  const router = useRouter()
  const path = router?.pathname || ''

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  function handleLogout(e) {
    if (e && e.preventDefault) e.preventDefault()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
      router.push('/admin/login')
    }
  }

  const nav = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/admin/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { href: '/admin/vehicles', label: 'Vehicles', icon: <Box size={20} /> },
    { href: '/admin/blog', label: 'Editorial Blog', icon: <Newspaper size={20} /> },
    { href: '/admin/testimonials', label: 'Reviews', icon: <MessageSquare size={20} /> },
    { href: '/admin/team', label: 'Leadership', icon: <Users size={20} /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> }
  ]

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar" style={{ background: '#fff', borderRight: '1px solid #E2E8F0', width: 240, height: '100vh', position: 'fixed', left: 0, top: 0, display: 'flex', flexDirection: 'column' }}>
        <div className="sidebar-logo-area" style={{ padding: '32px 32px 40px' }}>
          <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.1em', color: '#24276F' }}>ATLAS</div>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.2em', color: '#DF9738', marginTop: 4 }}>ADMINISTRATION</div>
          </Link>
        </div>

        <div className="sidebar-scrollable-section" style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
          <nav className="admin-nav" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {nav.map(item => {
              const isActive = path === item.href
              return (
                <Link key={item.href} href={item.href} style={{ 
                    borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none',
                    background: isActive ? '#F8FAFC' : 'transparent',
                    transition: '0.2s'
                }}>
                  <div style={{ color: isActive ? '#24276F' : '#64748B', display: 'flex', alignItems: 'center' }}>
                    {React.cloneElement(item.icon, { size: 16, strokeWidth: isActive ? 2 : 1.5 })}
                  </div>
                  <span style={{ fontWeight: isActive ? 700 : 600, fontSize: 13, color: isActive ? '#24276F' : '#475569' }}>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="sidebar-footer" style={{ padding: '40px 16px' }}>
          <button
            onClick={handleLogout}
            style={{ 
              width: '100%', padding: '0', background: 'none', border: 'none', 
              color: '#64748B', fontSize: 11, fontWeight: 800, 
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: 1
            }}
          >
            <LogOut size={12} strokeWidth={2} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="admin-main" style={{ marginLeft: 240, background: '#fff', minHeight: '100vh' }}>
        <header className="admin-header" style={{
           height: 80, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', 
           padding: '0 56px',
           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
           position: 'fixed', top: 0, left: 240, right: 0, zIndex: 50,
           borderBottom: '1px solid #E2E8F0',
           width: 'calc(100% - 240px)'
        }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: '#475569', textTransform: 'uppercase', letterSpacing: 2 }}>
             {title || 'Administrative Center'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, background: '#F8FAFC', borderRadius: '50%', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#24276F' }}>A</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#24276F' }}>Concierge</span>
             </div>
          </div>
        </header>

        <main className="admin-content-wrapper" style={{ padding: '112px 56px 56px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
