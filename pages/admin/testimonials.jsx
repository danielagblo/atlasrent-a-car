import React from 'react'
import { useRouter } from 'next/router'
import {
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Edit2,
  Trash2,
  MessageSquare,
  User
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import Modal from '../../components/Modal'

function empty() { return { name: '', role: '', quote: '', status: 'active', avatar: '' } }

export default function AdminTestimonials() {
  const router = useRouter()
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [form, setForm] = React.useState(empty())
  const [showCreate, setShowCreate] = React.useState(false)
  const [editingId, setEditingId] = React.useState(null)
  const [imagePreview, setImagePreview] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [filterStatus, setFilterStatus] = React.useState('all')
  const [sortBy, setSortBy] = React.useState('newest')

  React.useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) { router.replace('/admin/login'); return }
    let mounted = true
      ; (async () => {
        try {
          const res = await fetch('/api/testimonials', { headers: { Authorization: `Bearer ${token}` } })
          if (res.status === 401) {
            localStorage.removeItem('admin_token')
            router.replace('/admin/login')
            return
          }
          if (!res.ok) throw new Error('Failed to load testimonials')
          const data = await res.json()
          if (mounted) setItems(Array.isArray(data) ? data : [])
        } catch (e) { if (mounted) setError(e.message || String(e)) }
        if (mounted) setLoading(false)
      })()
    // listen to header search
    const onHeaderSearch = (e) => setSearch(String(e.detail || ''))
    window.addEventListener('admin:search', onHeaderSearch)
    return () => { mounted = false; window.removeEventListener('admin:search', onHeaderSearch) }
  }, [router])

  function onChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })) }

  async function onImageFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)

    try {
      const formData = new FormData()
      formData.append('image', file)
      const token = localStorage.getItem('admin_token')

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setForm(f => ({ ...f, avatar: data.url }))
    } catch (err) {
      setError('Image upload failed: ' + (err.message || String(err)))
    }
  }

  function edit(item) {
    setForm({
      name: item.name || '',
      role: item.role || '',
      quote: item.quote || '',
      status: item.status || 'active',
      avatar: item.avatar || ''
    })
    setEditingId(item.id)
    setImagePreview(item.avatar || '')
    setShowCreate(true)
  }

  async function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault()
    setError('')
    const token = localStorage.getItem('admin_token')
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error(`Failed to ${editingId ? 'update' : 'create'}`)
      const item = await res.json()

      if (editingId) {
        setItems(s => s.map(i => i.id === editingId ? item : i))
      } else {
        setItems(s => [item, ...s])
      }

      setForm(empty())
      setEditingId(null)
      setImagePreview('')
      setShowCreate(false)
    } catch (e) { setError(e.message || String(e)) }
  }

  async function remove(id) {
    if (!confirm('Delete this testimonial?')) return
    setError('')
    const token = localStorage.getItem('admin_token')
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error('Failed to delete')
      setItems(s => s.filter(i => i.id !== id))
    } catch (e) { setError(e.message || String(e)) }
  }

  const filtered = items.filter(i => {
    const q = search.trim().toLowerCase()
    if (q && !(`${i.name} ${i.role} ${i.quote}`.toLowerCase()).includes(q)) return false
    if (filterStatus !== 'all' && (i.status || 'active') !== filterStatus) return false
    return true
  }).sort((a, b) => {
    if (sortBy === 'newest') return (b.id || 0).toString().localeCompare((a.id || 0).toString())
    if (sortBy === 'oldest') return (a.id || 0).toString().localeCompare((b.id || 0).toString())
    if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '')
    return 0
  })

  return (
    <AdminLayout title="Testimonials">
      <div className="page-header">
        <h1 className="page-title">Manage Testimonials</h1>
        <p className="page-subtitle">/testimonials</p>
      </div>

      <div className="toolbar-row">
        <div className="toolbar-left">
          <div className="search-field">
            <Search className="search-icon" size={18} />
            <input
              className="models-search"
              placeholder="Search testimonials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="btn btn-outline"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
        <div className="toolbar-right">
          <select
            className="btn btn-outline"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
          </select>
          <button className="btn btn-primary" onClick={() => { setForm(empty()); setEditingId(null); setImagePreview(''); setShowCreate(true); }}>
            <Plus size={20} />
            <span>Create</span>
          </button>
        </div>
      </div>

      {loading && <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>Loading Testimonials...</div>}
      {error && <div className="danger" style={{ marginBottom: 16, padding: 12, background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8 }}>{error}</div>}

      {!loading && filtered.length === 0 && (
        <div className="empty-state" style={{ padding: '48px 32px', background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border)' }}>
          <MessageSquare size={60} style={{ color: 'var(--text-muted)', marginBottom: 20, opacity: 0.2 }} />
          <h3 className="empty-title" style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-primary)' }}>No testimonies found</h3>
          <p className="empty-subtitle" style={{ fontSize: 14, color: 'var(--text-muted)' }}>Try adjusting your filters or create a new entry</p>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)} style={{ marginTop: 24, height: 44 }}>Add First Testimony</button>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="card-grid">
          {filtered.map(item => (
            <article key={item.id} className="model-card" style={{ padding: '24px 32px', background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 24 }}>
              <div className="card-content-left" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 24 }}>
                {(item.avatar || item.image) && (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={item.avatar || item.image}
                      alt={item.name}
                      style={{ width: 64, height: 64, borderRadius: 16, objectFit: 'cover', background: '#000', border: '1px solid var(--border)' }}
                    />
                    <div style={{ position: 'absolute', bottom: -5, right: -5, width: 22, height: 22, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--bg-card)' }}>
                      <MessageSquare size={8} color="white" />
                    </div>
                  </div>
                )}
                <div className="card-info" style={{ flex: 1 }}>
                  <div className="card-info-header" style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="card-name" style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</span>
                    <span className="id-pill" style={{ background: 'var(--glass)', color: 'var(--text-muted)', padding: '2px 10px', fontSize: 10, fontWeight: 700, borderRadius: 99 }}>{item.role || 'PARTNER'}</span>
                  </div>
                  <div className="card-description" style={{ color: 'var(--text-secondary)', fontSize: 13, fontStyle: 'italic', lineHeight: 1.5, maxWidth: 600 }}>
                    "{item.quote || 'No content provided'}"
                  </div>
                </div>
              </div>

              <div className="card-actions" style={{ display: 'flex', gap: 12 }}>
                <button
                  className="btn btn-edit"
                  onClick={() => edit(item)}
                  style={{ width: 44, height: 44, padding: 0, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => remove(item.id)}
                  style={{ width: 44, height: 44, padding: 0, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={showCreate} title={editingId ? "Edit Testimonial" : "Create Testimonial"} onClose={() => setShowCreate(false)}>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-col">
            <label className="field-label">Name</label>
            <input name="name" placeholder="Author name" value={form.name} onChange={onChange} required />

            <label className="field-label">Role / Company</label>
            <input name="role" placeholder="e.g. CEO, G-Logistics" value={form.role} onChange={onChange} />

            <label className="field-label">Quote</label>
            <textarea name="quote" placeholder="Testimonial text" value={form.quote} onChange={onChange} style={{ minHeight: 100 }} required />
          </div>

          <div className="form-col">
            <label className="field-label">Avatar</label>
            <div className="input-group-row">
              <input name="avatar" placeholder="Avatar URL" value={form.avatar} onChange={onChange} style={{ flex: 1 }} />
              <span style={{ fontSize: 12, color: '#94A3B8' }}>or</span>
              <label className="btn btn-outline" style={{ margin: 0, height: 44, cursor: 'pointer' }}>
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={onImageFile} style={{ display: 'none' }} />
              </label>
            </div>

            <div className="image-preview-box" style={{ borderRadius: '50%', width: 100, height: 100, margin: '12px auto 0' }}>
              {imagePreview ? (
                <img src={imagePreview} alt="preview" style={{ borderRadius: '50%' }} />
              ) : (
                <div className="preview-placeholder" style={{ borderRadius: '50%' }}>
                  <User size={32} />
                </div>
              )}
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
            <button className="btn btn-primary" type="submit">
              {editingId ? 'Update Testimonial' : 'Create Testimonial'}
            </button>
            <button className="btn btn-outline" type="button" onClick={() => setShowCreate(false)}>Cancel</button>
          </div>
        </form>
      </Modal>

    </AdminLayout>
  )
}

AdminTestimonials.noLayout = true
