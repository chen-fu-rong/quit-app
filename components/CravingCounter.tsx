"use client"
import { useEffect, useMemo, useState } from 'react'
import { getSupabaseClient } from '../lib/supabase/client'

type Craving = { id: string; occurred_at: string; intensity: number }

export default function CravingCounter(){
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [cravings, setCravings] = useState<Craving[]>([])
  const [intensity, setIntensity] = useState<number>(5)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    let mounted = true
    async function load(){
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      const { data, error } = await supabase.from('cravings').select('id, occurred_at, intensity').eq('user_id', user.id).order('occurred_at', { ascending: false }).limit(100)
      if (error) console.error('fetch cravings', error)
      if (mounted && data) setCravings(data as Craving[])
      setLoading(false)
    }
    load()
    return ()=>{ mounted = false }
  }, [supabase])

  async function record(){
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token
    if (!token) { alert('Please sign in to record cravings'); return }

    // find active attempt id (optional)
    const { data: attempt } = await supabase.from('quit_attempts').select('id').eq('status','active').limit(1).maybeSingle()
    const attempt_id = attempt ? attempt.id : null

    const res = await fetch('/api/cravings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ intensity, attempt_id })
    })
    const json = await res.json()
    if (!res.ok) { console.error('insert craving', json); alert('Failed to save craving') }
    else setCravings(prev => [json.data as Craving, ...prev])
  }

  return (
    <section className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Craving Counter</h2>
      <div className="flex items-center gap-2">
        <input type="range" min={1} max={10} value={intensity} onChange={e=>setIntensity(Number(e.target.value))} />
        <span className="w-8 text-center">{intensity}</span>
        <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={record}>Record</button>
      </div>
      {loading ? <p>Loading...</p> : (
      <ul className="mt-3 space-y-2 max-h-40 overflow-auto">
        {cravings.map(c=> (
          <li key={c.id} className="text-sm">{new Date(c.occurred_at).toLocaleString()} — intensity {c.intensity}</li>
        ))}
      </ul>)}
    </section>
  )
}
