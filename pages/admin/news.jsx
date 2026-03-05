import React from 'react'
import { useRouter } from 'next/router'
import {
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Newspaper
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import Modal from '../../components/Modal'

function empty() { return { title: '', date: '', excerpt: '', image: '', status: 'active' } }

export default function AdminNews() {
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
          const res = await fetch('/api/news', { headers: { Authorization: `Bearer ${token}` } })
          if (res.status === 401) {
            localStorage.removeItem('admin_token')
            router.replace('/admin/login')
            return
          }
          if (!res.ok) throw new Error('Failed to load news')
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

      setForm(f => ({ ...f, image: data.url }))
    } catch (err) {
      setError('Image upload failed: ' + (err.message || String(err)))
    }
  }

  function edit(item) {
    setForm({
      title: item.title || '',
      date: item.date || '',
      excerpt: item.excerpt || '',
      image: item.image || '',
      status: item.status || 'active'
    })
    setEditingId(item.id)
    setImagePreview(item.image || '')
    setShowCreate(true)
  }

  async function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault()
    setError('')
    const token = localStorage.getItem('admin_token')
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/news/${editingId}` : '/api/news'

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
    if (!confirm('Delete this news item?')) return
    setError('')
    const token = localStorage.getItem('admin_token')
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error('Failed to delete')
      setItems(s => s.filter(i => i.id !== id))
    } catch (e) { setError(e.message || String(e)) }
  }

  const filtered = items.filter(i => {
    const q = search.trim().toLowerCase()
    if (q && !(`${i.title} ${i.excerpt} ${i.date}`.toLowerCase()).includes(q)) return false
    if (filterStatus !== 'all' && (i.status || 'active') !== filterStatus) return false
    return true
  }).sort((a, b) => {
    if (sortBy === 'newest') return (b.id || 0).toString().localeCompare((a.id || 0).toString())
    if (sortBy === 'oldest') return (a.id || 0).toString().localeCompare((b.id || 0).toString())
    if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '')
    return 0
  })

  return (
    <AdminLayout title="News">
      <div className="page-header">
        <h1 className="page-title">Manage News</h1>
        <p className="page-subtitle">/news</p>
      </div>

      <div className="toolbar-row">
        <div className="toolbar-left">
          <div className="search-field">
            <Search className="search-icon" size={18} />
            <input
              className="models-search"
              placeholder="Search news..."
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
            <option value="archived">Archived</option>
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
            <option value="title">Title A-Z</option>
          </select>
          <button className="btn btn-primary" onClick={() => { setForm(empty()); setEditingId(null); setImagePreview(''); setShowCreate(true); }}>
            <Plus size={20} />
            <span>Create</span>
          </button>
        </div>
      </div>

      {loading && <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading News...</div>}
      {error && <div className="danger" style={{ marginBottom: 16, padding: 12, background: 'var(--bg-danger)', border: '1px solid var(--border-danger)', borderRadius: 8 }}>{error}</div>}

      {!loading && filtered.length === 0 && (
        <div className="empty-state" style={{ padding: '48px 32px', background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border)' }}>
          <Newspaper size={60} style={{ color: 'var(--text-muted)', marginBottom: 20, opacity: 0.2 }} />
          <h3 className="empty-title" style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-primary)' }}>No news articles found</h3>
          <p className="empty-subtitle" style={{ fontSize: 14, color: 'var(--text-muted)' }}>Try adjusting your search terms or filters</p>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)} style={{ marginTop: 24, height: 44 }}>Create First Article</button>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="card-grid">
          {filtered.map(item => (
            <article key={item.id} className="model-card" style={{ padding: '20px 28px', background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="card-content-left" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 20 }}>
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.title}
                  style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', background: 'var(--bg-body)', border: '1px solid var(--border)' }}
                />
                <div className="card-info">
                  <div className="card-info-header" style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="card-name" style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{item.title}</span>
                    <span className="status-pill status-active" style={{ background: 'var(--glass)', color: 'var(--text-muted)', fontSize: 10 }}>{item.date || 'LATEST'}</span>
                  </div>
                  <div className="card-description" style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5, maxWidth: 600 }}>
                    {item.excerpt || 'No description provided'}
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

      <Modal open={showCreate} title={editingId ? "Edit News" : "Create News"} onClose={() => setShowCreate(false)}>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-col">
            <label className="field-label">Title</label>
            <input name="title" placeholder="Article title" value={form.title} onChange={onChange} required />

            <label className="field-label">Date</label>
            <input name="date" type="date" value={form.date} onChange={onChange} />

            <label className="field-label">Excerpt</label>
            <textarea name="excerpt" placeholder="Brief summary" value={form.excerpt} onChange={onChange} style={{ minHeight: 100 }} />
          </div>

          <div className="form-col">
            <label className="field-label">Image</label>
            <div className="input-group-row">
              <input name="image" placeholder="Image URL" value={form.image} onChange={onChange} style={{ flex: 1 }} />
              <span style={{ fontSize: 12, color: '#94A3B8' }}>or</span>
              <label className="btn btn-outline" style={{ margin: 0, height: 44, cursor: 'pointer' }}>
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={onImageFile} style={{ display: 'none' }} />
              </label>
            </div>

            <div className="image-preview-box">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" />
              ) : (
                <div className="preview-placeholder">No image selected</div>
              )}
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
            <button className="btn btn-primary" type="submit">
              {editingId ? 'Update News' : 'Create News'}
            </button>
            <button className="btn btn-outline" type="button" onClick={() => setShowCreate(false)}>Cancel</button>
          </div>
        </form>
      </Modal>

    </AdminLayout>
  )
}

AdminNews.noLayout = true
