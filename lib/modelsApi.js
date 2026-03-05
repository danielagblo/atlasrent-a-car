import { apiUrl } from './api'

export async function fetchModelsFromServer() {
  try {
    const resp = await fetch(apiUrl('/api/models'))
    if (!resp.ok) throw new Error('Failed to fetch models')
    const data = await resp.json()
    return Array.isArray(data) ? data : []
  } catch (e) {
    return []
  }
}

export async function getModels() {
  return await fetchModelsFromServer()
}
