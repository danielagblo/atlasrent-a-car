const PDFDocument = require('pdfkit')
const fs = require('fs-extra')
const path = require('path')
const cloudinary = require('../cloudinary')

async function saveBase64Image(dataUri) {
  if (!dataUri || typeof dataUri !== 'string' || !dataUri.startsWith('data:image/')) {
    return dataUri // not a base64 string, return as is
  }

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'ekgsite/uploads',
    })
    return result.secure_url
  } catch (error) {
    console.error('Cloudinary base64 upload failed:', error)
    return dataUri // fallback to original dataUri or handle error as needed
  }
}

async function processImages(body) {
  if (!body) return body
  const nextBody = { ...body }

  if (nextBody.image) {
    nextBody.image = await saveBase64Image(nextBody.image)
  }

  if (Array.isArray(nextBody.gallery)) {
    const nextGallery = []
    for (const item of nextBody.gallery) {
      if (item) {
        nextGallery.push(await saveBase64Image(item))
      }
    }
    nextBody.gallery = nextGallery
  }

  return nextBody
}

function slugify(value) {
  return (value || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function normalizeModel(input) {
  return {
    id: input.id,
    name: input.name,
    category: input.category || 'General',
    rate: input.rate || '',
    desc: input.desc || '',
    price: input.price || '',
    range: input.range || '',
    rangeUnit: input.rangeUnit || 'km',
    topSpeed: input.topSpeed || '',
    topSpeedUnit: input.topSpeedUnit || 'km/h',
    zeroToSixty: input.zeroToSixty || '',
    zeroToSixtyUnit: input.zeroToSixtyUnit || 's',
    image: input.image || '',
    localImage: input.localImage || '',
    gallery: Array.isArray(input.gallery) ? input.gallery.filter(Boolean) : [],
    features: Array.isArray(input.features)
      ? input.features.filter(Boolean)
      : (typeof input.features === 'string' ? input.features.split(',').map(s => s.trim()).filter(Boolean) : []),
    specs: {
      battery: input.specs?.battery || '',
      drive: input.specs?.drive || '',
      seats: Number(input.specs?.seats) || 0,
      charging: input.specs?.charging || '',
      transmission: input.specs?.transmission || '',
      fuelType: input.specs?.fuelType || ''
    }
  }
}

const storage = require('../api-storage')

async function buildInvoiceBuffer(order) {
  let settings = {}
  try {
    settings = await storage.getSettings()
  } catch (err) {
    settings = {}
  }
  const supportPhone = settings.supportPhone || '+233 (0)501 326 989'

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 40 })
      const chunks = []
      doc.on('data', c => chunks.push(c))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      // Add Logo if exists
      const logoPath = path.join(process.cwd(), 'public', 'logo-transparent.png')
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 440, 40, { width: 110 })
      }

      // Title & Company Header
      doc.fillColor('#E30613').fontSize(26).text('EKG LOGISTICS', 40, 40)
      doc.fillColor('#333333').fontSize(10).text('Premium Fleet Management & Concierge Services', 40, 75)

      doc.moveDown(4)

      // Invoice Header Card
      doc.fontSize(18).fillColor('#000').text('RENTAL CONFIRMATION', { align: 'center' })
      doc.moveDown(0.4)
      doc.fontSize(10).fillColor('#666').text(`Order Reference: #${order.id}`, { align: 'center' })
      doc.text(`Date Issued: ${new Date().toLocaleDateString('en-GB')}`, { align: 'center' })

      doc.moveDown(2)

      // Horizontal separator
      doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor('#eeeeee').stroke()
      doc.moveDown(2)

      // Reservation Details Section
      doc.fillColor('#E30613').fontSize(12).text('RESERVATION SPECIFICATIONS', 40, doc.y)
      doc.moveDown(1.5)

      const startY = doc.y
      const labelX = 40
      const valueX = 180
      const rowHeight = 22

      const fields = [
        { label: 'CLIENT NAME', value: order.name },
        { label: 'EMAIL ADDRESS', value: order.email || '-' },
        { label: 'PHONE NUMBER', value: order.phone || '-' },
        { label: 'VEHICLE MODEL', value: order.productName || 'Elite Fleet Model' },
        { label: 'RENTAL PERIOD', value: `${order.start} → ${order.end}` },
        { label: 'PICKUP HUB', value: order.location || 'Main Accra Terminal' }
      ]

      if (order.note) {
        fields.push({ label: 'SPECIAL NOTES', value: order.note })
      }

      fields.forEach((field, i) => {
        const top = startY + (i * rowHeight)
        doc.fontSize(9).fillColor('#888888').text(field.label, labelX, top)
        doc.fontSize(10).fillColor('#222222').text(`:  ${field.value}`, valueX, top)
        // subtle line
        doc.moveTo(labelX, top + 15).lineTo(555, top + 15).strokeColor('#f9f9f9').stroke()
      })

      doc.moveDown(3)

      // Financial Terms
      doc.fontSize(12).fillColor('#E30613').text('FINANCIAL TERMS & NOTES', 40, doc.y)
      doc.moveDown(1)

      doc.fontSize(10).fillColor('#222222').text(`Base Rate: ${order.rate || order.price || 'Bespoke Pricing'}`)
      doc.moveDown(0.5)
      doc.fontSize(9).fillColor('#666666').text('Note: This document serves as a booking confirmation. Complete payment is required upon vehicle delivery and physical inspection. We accept Bank Transfer, MoMo, and Major Credit Cards.')

      // Important Info Box
      doc.moveDown(3)
      doc.rect(40, doc.y, 515, 60).fillAndStroke('#fcfcfc', '#eeeeee')
      doc.fillColor('#333').fontSize(9).text('IMPORTANT NOTICE:', 50, doc.y + 10)
      doc.fillColor('#666').text(`Insurance is included for authorized drivers only. Unauthorized repairs or off-road use of luxury fleet models may void coverage. 24/7 Roadside Assistance is available at ${supportPhone}.`, 50, doc.y + 5, { width: 495 })

      // Footer
      doc.fontSize(8).fillColor('#aaaaaa').text('EKG Logistics - Accra, Ghana | ekglogistics.com', 40, 780, { align: 'center' })

      doc.end()
    } catch (e) { reject(e) }
  })
}

module.exports = { slugify, normalizeModel, buildInvoiceBuffer, processImages }
