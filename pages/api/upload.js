export const config = { api: { bodyParser: false } }

const { formidable } = require('formidable')
const fs = require('fs-extra')
const path = require('path')

async function handler(req, res) {
  if (req.method !== 'POST') return res.setHeader('Allow', 'POST') && res.status(405).end('Method Not Allowed')

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.ensureDir(uploadDir)

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 8 * 1024 * 1024,
    filename: (name, ext, part) => {
      return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}${ext || '.jpg'}`
    }
  })

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Upload failed', detail: err.message })
        return resolve()
      }
      const file = files.image?.[0] || files.file?.[0] || Object.values(files)[0]?.[0]
      if (!file) {
        res.status(400).json({ error: 'No file uploaded' })
        return resolve()
      }

      const filename = file.newFilename
      const host = req.headers.host
      const protocol = req.headers['x-forwarded-proto'] || (req.socket && req.socket.encrypted ? 'https' : 'http') || 'http'
      const url = `${protocol}://${host}/uploads/${filename}`
      res.json({ url, path: `/uploads/${filename}` })
      resolve()
    })
  })
}

export default handler
