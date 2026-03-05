const storage = require('../../lib/api-storage')

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).end('Method Not Allowed')
    }

    try {
        const settings = await storage.getSettings()
        // We only return public-safe settings here
        return res.json({
            adminEmail: settings?.adminEmail || 'info@ekgsite.com',
            adminSmsNumber: settings?.adminSmsNumber || '+233 501 326 989',
            supportPhone: settings?.supportPhone || '+233 501 326 989',
            headquarters: settings?.headquarters || 'Accra, Ghana',
            featuredBrands: settings?.featuredBrands || 'Toyota, Honda, Nissan, Hyundai'
        })
    } catch (e) {
        return res.status(500).json({ error: 'Failed to load settings' })
    }
}
