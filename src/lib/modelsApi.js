import DEFAULT_MODELS from '../data/models'
import { apiUrl } from './api'

export async function fetchModelsFromServer(){
  try{
    const resp = await fetch(apiUrl('/api/models'))
    if (!resp.ok) throw new Error('Failed to fetch models')
    const data = await resp.json()
    if (!Array.isArray(data)) return null
    return data
  }catch(e){
    return null
  }
}

export async function getModelsWithFallback(){
  const remote = await fetchModelsFromServer()
  if (remote && remote.length) return remote
  return DEFAULT_MODELS
}
