export const config = { api: { bodyParser: false } }

import { formidable } from 'formidable'
import cloudinary from '../../lib/cloudinary'

async function handler(req, res) {
  if (req.method !== 'POST') return res.setHeader('Allow', 'POST') && res.status(405).end('Method Not Allowed')

  const form = formidable({})

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Upload failed', detail: err.message })
        return resolve()
      }
      const file = files.image?.[0] || files.file?.[0] || Object.values(files)[0]?.[0]
      if (!file) {
        res.status(400).json({ error: 'No file uploaded' })
        return resolve()
      }

      try {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: 'ekgsite/uploads',
        })
        res.json({ url: result.secure_url, public_id: result.public_id })
        resolve()
      } catch (uploadError) {
        res.status(500).json({ error: 'Cloudinary upload failed', detail: uploadError.message })
        resolve()
      }
    })
  })
}

export default handler
