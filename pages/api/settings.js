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
            adminEmail: settings?.adminEmail || 'concierge@ekgtransport.com',
            adminSmsNumber: settings?.adminSmsNumber || '+233 501 326 989',
            supportPhone: settings?.supportPhone || '+233 (0)501 326 989',
            featuredBrands: settings?.featuredBrands || 'Toyota, Honda, Nissan, Hyundai'
        })
    } catch (e) {
        return res.status(500).json({ error: 'Failed to load settings' })
    }
}
