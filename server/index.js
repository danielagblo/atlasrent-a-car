const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs-extra')
const path = require('path')
const PDFDocument = require('pdfkit')
const nodemailer = require('nodemailer')
const cors = require('cors')
const multer = require('multer')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const DATA_DIR = path.join(__dirname, 'data')
const UPLOADS_DIR = path.join(__dirname, 'uploads')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')
const MODELS_FILE = path.join(DATA_DIR, 'models.json')
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json')
const NEWS_FILE = path.join(DATA_DIR, 'news.json')
const DEFAULT_MODELS = [
  {
    id: 'lux',
    name: 'EKG Lux',
    category: 'Sedan',
    rate: '¢1,100/day',
    desc: 'Flagship electric sedan — hand-crafted luxury with long range.',
    price: '$89,900',
    range: '370 mi',
    topSpeed: '155 mph',
    zeroToSixty: '3.8s',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    localImage: '/assets/lux.jpg',
    gallery: [],
    specs: { battery: '98 kWh', drive: 'Dual Motor AWD', seats: 5, charging: '250 kW DC fast charge' }
  },
  {
    id: 'sport',
    name: 'EKG Sport',
    category: 'Performance',
    rate: '¢1,700/day',
    desc: 'Performance first — aggressive dynamics and track-capability.',
    price: '$109,900',
    range: '320 mi',
    topSpeed: '190 mph',
    zeroToSixty: '2.9s',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80',
    localImage: '/assets/sport.jpg',
    gallery: [],
    specs: { battery: '110 kWh', drive: 'Tri Motor AWD', seats: 4, charging: '300 kW DC fast charge' }
  },
  {
    id: 'tour',
    name: 'EKG Tour',
    category: 'SUV',
    rate: '¢1,500/day',
    desc: 'Long range SUV — family comfort with a commanding presence.',
    price: '$99,900',
    range: '410 mi',
    topSpeed: '145 mph',
    zeroToSixty: '4.6s',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
    localImage: '/assets/tour.jpg',
    gallery: [],
    specs: { battery: '120 kWh', drive: 'Dual Motor AWD', seats: 7, charging: '270 kW DC fast charge' }
  }
]
const DEFAULT_TESTIMONIALS = [
  { id: 't1', name: 'Sofia Martinez', role: 'Entrepreneur', quote: 'The EKG Lux is the perfect blend of comfort and performance. Renting was effortless and the delivery service was punctual.' },
  { id: 't2', name: 'Daniel Park', role: 'Consultant', quote: 'Exceptional vehicle and excellent service. The car felt brand new and the range was impressive.' },
  { id: 't3', name: 'Maya Singh', role: 'Photographer', quote: 'Beautiful interiors and a smooth ride — ideal for long trips and client pickups.' }
]
const DEFAULT_NEWS = [
  { id: 'n1', title: 'EKG Lux Wins Design Award', date: '2026-01-15', excerpt: 'The EKG Lux was recognized for innovative interior design and sustainability initiatives.', image: '/assets/news1.jpg' },
  { id: 'n2', title: 'New Charging Network Partnership', date: '2026-02-01', excerpt: 'EKG Logistics and transport partners with GridCharge to expand fast-charging availability across major routes.', image: '/assets/news2.jpg' }
]
fs.ensureDirSync(DATA_DIR)
fs.ensureDirSync(UPLOADS_DIR)
if (!fs.existsSync(ORDERS_FILE)) fs.writeJsonSync(ORDERS_FILE, [])
if (!fs.existsSync(MODELS_FILE)) fs.writeJsonSync(MODELS_FILE, DEFAULT_MODELS, { spaces: 2 })
if (!fs.existsSync(TESTIMONIALS_FILE)) fs.writeJsonSync(TESTIMONIALS_FILE, DEFAULT_TESTIMONIALS, { spaces: 2 })
if (!fs.existsSync(NEWS_FILE)) fs.writeJsonSync(NEWS_FILE, DEFAULT_NEWS, { spaces: 2 })

app.use('/uploads', express.static(UPLOADS_DIR))

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase()
    const safeExt = ext || '.jpg'
    cb(null, `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}${safeExt}`)
  }
})

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowed.includes(file.mimetype)) return cb(new Error('Unsupported file type'))
    cb(null, true)
  }
})

app.post('/api/upload', upload.single('image'), (req,res)=>{
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  const host = req.get('host')
  const protocol = req.protocol
  const relativePath = `/uploads/${req.file.filename}`
  const url = `${protocol}://${host}${relativePath}`
  res.json({ url, path: relativePath })
})

function loadOrders(){
  try{ return fs.readJsonSync(ORDERS_FILE) }catch(e){ return [] }
}

function saveOrders(orders){ fs.writeJsonSync(ORDERS_FILE, orders, { spaces: 2 }) }

function loadModels(){
  try{ return fs.readJsonSync(MODELS_FILE) }catch(e){ return [] }
}

function saveModels(models){ fs.writeJsonSync(MODELS_FILE, models, { spaces: 2 }) }

function loadTestimonials(){
  try{ return fs.readJsonSync(TESTIMONIALS_FILE) }catch(e){ return [] }
}

function saveTestimonials(items){ fs.writeJsonSync(TESTIMONIALS_FILE, items, { spaces: 2 }) }

function loadNews(){
  try{ return fs.readJsonSync(NEWS_FILE) }catch(e){ return [] }
}

function saveNews(items){ fs.writeJsonSync(NEWS_FILE, items, { spaces: 2 }) }

function buildAdminOrderSms(order){
  const id = order?.id || '-'
  const customer = order?.name || 'Unknown customer'
  const phone = order?.phone || '-'
  const product = order?.productName || order?.model || order?.product || 'Vehicle'
  const location = order?.location || '-'
  const dates = `${order?.start || '-'} to ${order?.end || '-'}`
  return `New order ${id}. Customer: ${customer}. Phone: ${phone}. Vehicle: ${product}. Pickup: ${location}. Dates: ${dates}.`
}

async function sendAdminOrderSms(order){
  const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY
  const paystackSmsUrl = process.env.PAYSTACK_SMS_URL
  const adminSmsNumber = process.env.ADMIN_SMS_NUMBER
  const sender = process.env.PAYSTACK_SMS_SENDER || 'EKG Logistics'

  if (!paystackSecretKey || !paystackSmsUrl || !adminSmsNumber){
    return { ok: false, skipped: true, reason: 'Missing PAYSTACK_SECRET_KEY, PAYSTACK_SMS_URL, or ADMIN_SMS_NUMBER' }
  }

  const message = buildAdminOrderSms(order)
  const payload = {
    to: adminSmsNumber,
    from: sender,
    message,
    body: message,
    sms: message
  }

  const response = await fetch(paystackSmsUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${paystackSecretKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const text = await response.text()
  if (!response.ok) throw new Error(`SMS gateway returned ${response.status}: ${text.slice(0, 300)}`)
  return { ok: true, text }
}

function slugify(value){
  return (value || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function normalizeModel(input){
  return {
    id: input.id,
    name: input.name,
    category: input.category || 'General',
    rate: input.rate || '',
    desc: input.desc || '',
    price: input.price || '',
    range: input.range || '',
    topSpeed: input.topSpeed || '',
    zeroToSixty: input.zeroToSixty || '',
    image: input.image || '',
    localImage: input.localImage || '',
    gallery: Array.isArray(input.gallery) ? input.gallery.filter(Boolean) : [],
    specs: {
      battery: input.specs?.battery || '',
      drive: input.specs?.drive || '',
      seats: Number(input.specs?.seats) || 0,
      charging: input.specs?.charging || ''
    }
  }
}

app.get('/api/orders', (req,res)=>{
  res.json(loadOrders())
})

app.get('/api/orders/:id', (req,res)=>{
  const orders = loadOrders()
  const order = orders.find(o => o.id === req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(order)
})

app.post('/api/orders', (req,res)=>{
  const orders = loadOrders()
  const id = Date.now().toString(36)
  const order = Object.assign({ id, createdAt: new Date().toISOString() }, req.body)
  orders.unshift(order)
  saveOrders(orders)

  sendAdminOrderSms(order)
    .then(result => {
      if (result?.skipped) console.warn('SMS skipped:', result.reason)
    })
    .catch(error => {
      console.error('SMS notification error:', error.message || error)
    })

  res.json(order)
})

app.put('/api/orders/:id', (req,res)=>{
  const orders = loadOrders()
  const id = req.params.id
  const idx = orders.findIndex(o => o.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Order not found' })

  const current = orders[idx]
  const next = Object.assign({}, current, req.body, { id: current.id, createdAt: current.createdAt })
  orders[idx] = next
  saveOrders(orders)
  res.json(next)
})

app.delete('/api/orders/:id', (req,res)=>{
  const orders = loadOrders()
  const filtered = orders.filter(o => o.id !== req.params.id)
  if (filtered.length === orders.length) return res.status(404).json({ error: 'Order not found' })
  saveOrders(filtered)
  res.json({ ok: true })
})

app.get('/api/models', (req,res)=>{
  res.json(loadModels())
})

app.post('/api/models', (req,res)=>{
  const models = loadModels()
  const name = req.body?.name || ''
  if (!name.trim()) return res.status(400).json({ error: 'Model name is required' })

  let id = slugify(req.body?.id || name)
  if (!id) id = Date.now().toString(36)
  if (models.some(m => m.id === id)) id = `${id}-${Date.now().toString(36)}`

  const created = normalizeModel({ ...req.body, id })
  models.unshift(created)
  saveModels(models)
  res.json(created)
})

app.put('/api/models/:id', (req,res)=>{
  const models = loadModels()
  const id = req.params.id
  const idx = models.findIndex(m => m.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Model not found' })

  const next = normalizeModel({ ...models[idx], ...req.body, id })
  models[idx] = next
  saveModels(models)
  res.json(next)
})

app.delete('/api/models/:id', (req,res)=>{
  const models = loadModels()
  const id = req.params.id
  const filtered = models.filter(m => m.id !== id)
  if (filtered.length === models.length) return res.status(404).json({ error: 'Model not found' })
  saveModels(filtered)
  res.json({ ok: true })
})

app.get('/api/testimonials', (req,res)=>{
  res.json(loadTestimonials())
})

app.post('/api/testimonials', (req,res)=>{
  const items = loadTestimonials()
  const name = req.body?.name || ''
  const quote = req.body?.quote || ''
  if (!name.trim() || !quote.trim()) return res.status(400).json({ error: 'Name and quote are required' })

  const id = req.body?.id || `t-${Date.now().toString(36)}`
  const item = {
    id,
    name,
    role: req.body?.role || '',
    quote
  }
  items.unshift(item)
  saveTestimonials(items)
  res.json(item)
})

app.put('/api/testimonials/:id', (req,res)=>{
  const items = loadTestimonials()
  const id = req.params.id
  const idx = items.findIndex(i => i.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Testimonial not found' })

  const next = {
    ...items[idx],
    ...req.body,
    id
  }
  items[idx] = next
  saveTestimonials(items)
  res.json(next)
})

app.delete('/api/testimonials/:id', (req,res)=>{
  const items = loadTestimonials()
  const filtered = items.filter(i => i.id !== req.params.id)
  if (filtered.length === items.length) return res.status(404).json({ error: 'Testimonial not found' })
  saveTestimonials(filtered)
  res.json({ ok: true })
})

app.get('/api/news', (req,res)=>{
  res.json(loadNews())
})

app.post('/api/news', (req,res)=>{
  const items = loadNews()
  const title = req.body?.title || ''
  if (!title.trim()) return res.status(400).json({ error: 'News title is required' })

  const id = req.body?.id || `n-${Date.now().toString(36)}`
  const item = {
    id,
    title,
    date: req.body?.date || new Date().toISOString().slice(0,10),
    excerpt: req.body?.excerpt || '',
    image: req.body?.image || ''
  }
  items.unshift(item)
  saveNews(items)
  res.json(item)
})

app.put('/api/news/:id', (req,res)=>{
  const items = loadNews()
  const id = req.params.id
  const idx = items.findIndex(i => i.id === id)
  if (idx === -1) return res.status(404).json({ error: 'News item not found' })

  const next = {
    ...items[idx],
    ...req.body,
    id
  }
  items[idx] = next
  saveNews(items)
  res.json(next)
})

app.delete('/api/news/:id', (req,res)=>{
  const items = loadNews()
  const filtered = items.filter(i => i.id !== req.params.id)
  if (filtered.length === items.length) return res.status(404).json({ error: 'News item not found' })
  saveNews(filtered)
  res.json({ ok: true })
})

app.get('/api/invoice/:id', (req,res)=>{
  const orders = loadOrders()
  const id = req.params.id
  const order = orders.find(o => o.id === id)
  if (!order) return res.status(404).send('Order not found')
  // Stream PDF to response
  const doc = new PDFDocument({ size: 'A4', margin: 40 })
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${order.id}.pdf`)
  doc.fontSize(20).text('EKG Logistics and transport', {align: 'left'})
  doc.moveDown(0.5)
  doc.fontSize(14).text(`Invoice — Order ${order.id}`)
  doc.moveDown(1)

  doc.fontSize(12).text(`Product: ${order.productName} (${order.price})`)
  doc.text(`Customer: ${order.name}`)
  doc.text(`Email: ${order.email}`)
  doc.text(`Pickup location: ${order.location || '-'}`)
  doc.text(`Dates: ${order.start || '-'} → ${order.end || '-'}`)
  doc.moveDown(1)

  doc.text('Payment terms: Payment will be collected upon delivery.', {underline:true})
  doc.moveDown(2)

  doc.text('Thank you for choosing EKG Logistics and transport.', {align:'left'})
  doc.pipe(res)
  doc.end()
})

// Helper: build PDF buffer for an order
function buildInvoiceBuffer(order){
  return new Promise((resolve,reject)=>{
    try{
      const doc = new PDFDocument({ size: 'A4', margin: 40 })
      const chunks = []
      doc.on('data', c => chunks.push(c))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      doc.fontSize(20).text('EKG Logistics and transport', {align: 'left'})
      doc.moveDown(0.5)
      doc.fontSize(14).text(`Invoice — Order ${order.id}`)
      doc.moveDown(1)

      doc.fontSize(12).text(`Product: ${order.productName} (${order.price})`)
      doc.text(`Customer: ${order.name}`)
      doc.text(`Email: ${order.email}`)
      doc.text(`Pickup location: ${order.location || '-'}`)
      doc.text(`Dates: ${order.start || '-'} → ${order.end || '-'}`)
      doc.moveDown(1)

      doc.text('Payment terms: Payment will be collected upon delivery.', {underline:true})
      doc.moveDown(2)

      doc.text('Thank you for choosing EKG Logistics and transport.', {align:'left'})
      doc.end()
    }catch(e){ reject(e) }
  })
}

// Endpoint to email invoice PDF to customer (requires SMTP env vars)
app.post('/api/invoice/:id/email', async (req,res)=>{
  const orders = loadOrders()
  const id = req.params.id
  const order = orders.find(o => o.id === id)
  if (!order) return res.status(404).json({ error: 'Order not found' })

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const fromEmail = process.env.FROM_EMAIL || (smtpUser || '')

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass){
    return res.status(501).json({ error: 'SMTP not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS env vars.' })
  }

  try{
    const pdfBuffer = await buildInvoiceBuffer(order)

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465, // true for 465
      auth: { user: smtpUser, pass: smtpPass }
    })

    const info = await transporter.sendMail({
      from: fromEmail,
      to: order.email,
      subject: `EKG Logistics and transport — Invoice ${order.id}`,
      text: `Dear ${order.name},\n\nPlease find attached the invoice for your order ${order.id}. Payment will be collected on delivery.\n\nThank you,\nEKG Logistics and transport`,
      attachments: [ { filename: `invoice-${order.id}.pdf`, content: pdfBuffer } ]
    })

    res.json({ ok: true, info })
  }catch(e){
    console.error('Email error', e)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log('Server running on', PORT))
