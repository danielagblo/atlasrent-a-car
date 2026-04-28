import { apiUrl } from './api'

export async function fetchVehiclesFromServer() {
  try {
    const resp = await fetch(apiUrl('/api/vehicles'))
    if (!resp.ok) throw new Error('Failed to fetch vehicles')
    const data = await resp.json()
    if (!Array.isArray(data)) return []

    // Expand items with priceOutside into two separate entries for the UI
    const expanded = []
    data.forEach(item => {
      expanded.push(item)
      if (item.priceOutside) {
        expanded.push({
          ...item,
          id: `${item.id}-outside`,
          name: `${item.name} (Outside Accra)`,
          price: item.priceOutside,
          isOutsideAccra: true
        })
      }
    })
    return expanded
  } catch (e) {
    console.error('fetchVehiclesFromServer error:', e)
    return []
  }
}

export async function getVehicles() {
  return await fetchVehiclesFromServer()
}
