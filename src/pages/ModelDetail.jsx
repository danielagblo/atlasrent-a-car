import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getModelsWithFallback } from '../lib/modelsApi'

export default function ModelDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [models, setModels] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await getModelsWithFallback()
      if (mounted) {
        setModels(data)
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const model = models.find(m => m.id === id)

  if (loading) return <section style={{padding:60}}>Loading model...</section>

  if (!model) return <section style={{padding:60}}>Model not found</section>

  return (
    <section style={{padding:60,display:'grid',gridTemplateColumns:'1fr 420px',gap:28}}>
      <div>
        <h2>{model.name}</h2>
        <p style={{color:'var(--muted)'}}>{model.desc}</p>

        <div style={{display:'flex',gap:14,marginTop:18}}>
          <div style={{padding:12,background:'rgba(255,255,255,0.02)',borderRadius:10}}>
            <div style={{fontSize:14,fontWeight:700}}>{model.range}</div>
            <div style={{color:'var(--muted)',fontSize:13}}>Range</div>
          </div>
          <div style={{padding:12,background:'rgba(255,255,255,0.02)',borderRadius:10}}>
            <div style={{fontSize:14,fontWeight:700}}>{model.topSpeed}</div>
            <div style={{color:'var(--muted)',fontSize:13}}>Top speed</div>
          </div>
          <div style={{padding:12,background:'rgba(255,255,255,0.02)',borderRadius:10}}>
            <div style={{fontSize:14,fontWeight:700}}>{model.zeroToSixty}</div>
            <div style={{color:'var(--muted)',fontSize:13}}>0–60</div>
          </div>
        </div>

        <h3 style={{marginTop:22}}>Specifications</h3>
        <ul style={{color:'var(--muted)'}}>
          <li>Battery: {model.specs.battery}</li>
          <li>Drive: {model.specs.drive}</li>
          <li>Seats: {model.specs.seats}</li>
          <li>Charging: {model.specs.charging}</li>
        </ul>

        <h3 style={{marginTop:18}}>Gallery</h3>
        <div style={{display:'flex',gap:10,marginTop:10}}>
          {model.gallery.map((g,i)=> (
            <img key={i} src={g} style={{width:160,height:100,objectFit:'cover',borderRadius:8}} alt={`${model.name} ${i}`} />
          ))}
        </div>
      </div>

      <aside>
        <div style={{background:'rgba(255,255,255,0.02)',padding:18,borderRadius:12}}>
          <img src={model.image} alt={model.name} style={{width:'100%',borderRadius:10,objectFit:'cover'}} />
          <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:700}}>{model.name}</div>
              <div style={{color:'var(--muted)'}}>{model.price}</div>
            </div>
            <div>
              <button className="primary" onClick={() => navigate(`/order/${model.id}`)} style={{
                padding: '12px 24px',
                fontSize: 15,
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(184, 144, 51, 0.3)'
              }}>
                Book Now →
              </button>
            </div>
          </div>
        </div>
      </aside>
    </section>
  )
}
