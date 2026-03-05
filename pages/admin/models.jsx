import React from 'react'
import { useRouter } from 'next/router'
import {
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Box
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import Modal from '../../components/Modal'

function empty() {
  return {
    name: '',
    category: '',
    price: '',
    image: '',
    desc: '',
    status: 'active',
    range: '',
    topSpeed: '',
    zeroToSixty: '',
    rate: '',
    specs: {
      battery: '',
      drive: '',
      seats: '',
      charging: '',
      transmission: '',
      fuelType: ''
    }
  }
}

export default function AdminModels() {
  const router = useRouter()
  const [editingId, setEditingId] = React.useState(null)
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [form, setForm] = React.useState(empty())
  const [showCreate, setShowCreate] = React.useState(false)
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
          const res = await fetch('/api/models', { headers: { Authorization: `Bearer ${token}` } })
          if (res.status === 401) {
            localStorage.removeItem('admin_token')
            router.replace('/admin/login')
            return
          }
          if (!res.ok) throw new Error('Failed to load models')
          const data = await res.json()
          if (mounted) setItems(Array.isArray(data) ? data : [])
        } catch (e) { if (mounted) setError(e.message || String(e)) }
        if (mounted) setLoading(false)
      })()
    const onHeaderSearch = (e) => setSearch(String(e.detail || ''))
    window.addEventListener('admin:search', onHeaderSearch)
    return () => { mounted = false; window.removeEventListener('admin:search', onHeaderSearch) }
  }, [router])

  function onChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function onSpecChange(e) {
    const { name, value } = e.target
    setForm(f => ({
      ...f,
      specs: {
        ...(f.specs || {}),
        [name]: value
      }
    }))
  }

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
      name: item.name || '',
      category: item.category || '',
      price: item.price || '',
      image: item.image || '',
      desc: item.desc || '',
      status: item.status || 'active',
      range: item.range || '',
      topSpeed: item.topSpeed || '',
      zeroToSixty: item.zeroToSixty || '',
      rate: item.rate || '',
      specs: {
        battery: item.specs?.battery || '',
        drive: item.specs?.drive || '',
        seats: item.specs?.seats || '',
        charging: item.specs?.charging || '',
        transmission: item.specs?.transmission || '',
        fuelType: item.specs?.fuelType || ''
      }
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
    const url = editingId ? `/api/models/${editingId}` : '/api/models'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      })
      if (res.status === 401) {
        localStorage.removeItem('admin_token')
        router.replace('/admin/login')
        return
      }
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
    if (!confirm('Delete this model?')) return
    setError('')
    const token = localStorage.getItem('admin_token')
    try {
      const res = await fetch(`/api/models/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (res.status === 401) {
        localStorage.removeItem('admin_token')
        router.replace('/admin/login')
        return
      }
      if (!res.ok) throw new Error('Failed to delete')
      setItems(s => s.filter(i => i.id !== id))
    } catch (e) { if (mounted) setError(e.message || String(e)) }
  }

  const filtered = items.filter(i => {
    const q = search.trim().toLowerCase()
    if (q && !(`${i.name} ${i.category} ${i.desc} ${i.id}`.toLowerCase()).includes(q)) return false
    if (filterStatus !== 'all' && (i.status || 'active') !== filterStatus) return false
    return true
  }).sort((a, b) => {
    if (sortBy === 'newest') return (b.id || 0).toString().localeCompare((a.id || 0).toString())
    if (sortBy === 'oldest') return (a.id || 0).toString().localeCompare((b.id || 0).toString())
    if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '')
    return 0
  })

  return (
    <AdminLayout title="Models">
      <div className="page-header">
        <h1 className="page-title">Manage Models</h1>
        <p className="page-subtitle">/models</p>
      </div>

      <div className="toolbar-row">
        <div className="toolbar-left">
          <div className="search-field">
            <Search className="search-icon" size={18} />
            <input
              className="models-search"
              placeholder="Search models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="btn btn-outline"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{ padding: '0 12px' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="toolbar-right">
          <select
            className="btn btn-outline"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{ padding: '0 12px' }}
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

      {loading && <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>Loading Models...</div>}
      {error && <div className="danger" style={{ marginBottom: 16, padding: 12, background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8 }}>{error}</div>}

      {!loading && filtered.length === 0 && (
        <div className="empty-state" style={{ padding: '48px 32px', background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border)' }}>
          <Box size={60} style={{ color: 'var(--text-muted)', marginBottom: 20, opacity: 0.2 }} />
          <h3 className="empty-title" style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-primary)' }}>No models found</h3>
          <p className="empty-subtitle" style={{ fontSize: 14, color: 'var(--text-muted)' }}>Try adjusting your search terms or filters</p>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)} style={{ marginTop: 24, height: 44 }}>Add First Vehicle</button>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="card-grid">
          {filtered.map(item => (
            <article key={item.id} className="model-card" style={{ padding: '20px 28px', background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="card-content-left" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 20 }}>
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  style={{ width: 100, height: 64, borderRadius: 12, objectFit: 'cover', background: '#000', border: '1px solid var(--border)' }}
                />
                <div className="card-info">
                  <div className="card-info-header" style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="card-name" style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</span>
                    <span className={`status-pill status-${item.status || 'active'}`} style={{ fontSize: 10 }}>{item.status || 'Active'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{item.price || item.rate} GHS</span>
                    <span style={{ opacity: 0.4 }}>•</span>
                    <span>{item.category || 'Luxury'}</span>
                    <span style={{ opacity: 0.4 }}>•</span>
                    <span className="id-pill" style={{ background: 'var(--glass)', color: 'var(--text-muted)', padding: '2px 8px', fontSize: 10, borderRadius: 99 }}>#{item.id}</span>
                  </div>
                </div>
              </div>

              <div className="card-actions" style={{ display: 'flex', gap: 12 }}>
                <button
                  className="btn btn-edit"
                  onClick={() => edit(item)}
                  style={{ width: 44, height: 44, padding: 0, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Edit Model"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => remove(item.id)}
                  style={{ width: 44, height: 44, padding: 0, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Delete Model"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={showCreate} title={editingId ? "Edit Model" : "Create Model"} onClose={() => setShowCreate(false)}>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-sections" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            <div className="form-column">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>General Info</h3>

              <label className="field-label">Model Name</label>
              <input name="name" placeholder="e.g. Mercedes Benz C300" value={form.name} onChange={onChange} required />

              <label className="field-label">Category</label>
              <select name="category" value={form.category} onChange={onChange} className="form-select">
                <option value="">Select a category</option>
                <option value="Luxury">Luxury (Elite)</option>
                <option value="Executive">Executive</option>
                <option value="Sport">Sport</option>
                <option value="Economy">Economy</option>
                <option value="Cargo">Cargo/Utility</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>

              <label className="field-label">Daily Price (GHS)</label>
              <input name="price" placeholder="e.g. 1200" value={form.price} onChange={onChange} />

              <label className="field-label">Description</label>
              <textarea name="desc" placeholder="Brief description of the vehicle" value={form.desc} onChange={onChange} style={{ minHeight: 100 }} />
            </div>

            <div className="form-column">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Technical Details</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="field-label">Range (e.g. 500km)</label>
                  <input name="range" placeholder="500km" value={form.range} onChange={onChange} />
                </div>
                <div>
                  <label className="field-label">Seats</label>
                  <input name="seats" placeholder="5" value={form.specs?.seats} onChange={onSpecChange} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="field-label">Top Speed</label>
                  <input name="topSpeed" placeholder="250 km/h" value={form.topSpeed} onChange={onChange} />
                </div>
                <div>
                  <label className="field-label">0-60 MPH</label>
                  <input name="zeroToSixty" placeholder="4.5s" value={form.zeroToSixty} onChange={onChange} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="field-label">Transmission</label>
                  <select name="transmission" value={form.specs?.transmission} onChange={onSpecChange} className="form-select">
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="Semi-Automatic">Semi-Automatic</option>
                    <option value="Direct Drive">Direct Drive (Electric)</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Fuel Type</label>
                  <select name="fuelType" value={form.specs?.fuelType} onChange={onSpecChange} className="form-select">
                    <option value="">Select Fuel Type</option>
                    <option value="Electric">100% Electric</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid (Petrol/Electric)</option>
                    <option value="Plug-in Hybrid">Plug-in Hybrid (PHEV)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="field-label">Battery/Engine</label>
                  <select name="battery" value={form.specs?.battery} onChange={onSpecChange} className="form-select">
                    <option value="">Select Power Unit</option>
                    <option value="60 kWh">60 kWh (Standard Range)</option>
                    <option value="80 kWh">80 kWh (Long Range)</option>
                    <option value="100 kWh">100 kWh (Performance)</option>
                    <option value="2.0L I4">2.0L I4 Turbo</option>
                    <option value="3.0L V6">3.0L V6 Turbo</option>
                    <option value="4.0L V8">4.0L V8 Biturbo</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Drive Type</label>
                  <select name="drive" value={form.specs?.drive} onChange={onSpecChange} className="form-select">
                    <option value="">Select Drive</option>
                    <option value="AWD">AWD (All Wheel Drive)</option>
                    <option value="RWD">RWD (Rear Wheel Drive)</option>
                    <option value="FWD">FWD (Front Wheel Drive)</option>
                    <option value="4WD">4×4 / 4WD</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24, padding: 16, border: '1px solid #F1F5F9', borderRadius: 12, background: '#F8FAFC' }}>
              <label className="field-label">Vehicle Image</label>
              <div className="input-group-row" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <input name="image" placeholder="Image URL" value={form.image} onChange={onChange} style={{ flex: 1 }} />
                <span style={{ fontSize: 12, color: '#94A3B8' }}>or</span>
                <label className="btn btn-outline" style={{ margin: 0, height: 44, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <span>Upload File</span>
                  <input type="file" accept="image/*" onChange={onImageFile} style={{ display: 'none' }} />
                </label>
              </div>
              {imagePreview && (
                <div style={{ width: '100%', height: 180, borderRadius: 8, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                  <img src={imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <div className="form-actions" style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn btn-outline" type="button" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" type="submit">
                {editingId ? 'Save Changes' : 'Create Model'}
              </button>
            </div>
          </div>
        </form>
      </Modal>

    </AdminLayout>
  )
}

AdminModels.noLayout = true
