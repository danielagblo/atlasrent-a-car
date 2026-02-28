import DEFAULT_TESTIMONIALS from '../data/testimonials'
import DEFAULT_NEWS from '../data/news'
import { apiUrl } from './api'

async function fetchList(path){
  try{
    const resp = await fetch(apiUrl(path))
    if (!resp.ok) throw new Error('Failed')
    const data = await resp.json()
    return Array.isArray(data) ? data : null
  }catch(e){
    return null
  }
}

export async function getTestimonialsWithFallback(){
  const remote = await fetchList('/api/testimonials')
  if (remote && remote.length) return remote
  return DEFAULT_TESTIMONIALS
}

export async function getNewsWithFallback(){
  const remote = await fetchList('/api/news')
  if (remote && remote.length) return remote
  return DEFAULT_NEWS
}
