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
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (!token) { alert('Please sign in to record cravings'); return }

      const { data: attempt } = await supabase.from('quit_attempts').select('id').eq('status','active').limit(1).maybeSingle()
      const attempt_id = attempt ? attempt.id : null

      const res = await fetch('/api/cravings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ intensity, attempt_id })
      })

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`)
      }
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      
      setCravings(prev => [json.data as Craving, ...prev])
    } catch (err) {
      console.error('insert craving error', err)
      alert('Failed to save craving. Please check Vercel environment variables.')
    }
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Craving Counter</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Record urges quickly</h2>
        </div>
        <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">
          {cravings.length} logged
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">
          <label className="flex items-center gap-4 text-slate-200">
            <input type="range" min={1} max={10} value={intensity} onChange={e=>setIntensity(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-violet-500" />
            <span className="min-w-[2.5rem] text-lg font-semibold text-white">{intensity}</span>
          </label>
        </div>

        <button className="w-full rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400" onClick={record}>
          Record Craving
        </button>

        <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">
          {loading ? (
            <p className="text-slate-300">Loading cravings...</p>
          ) : cravings.length ? (
            <ul className="space-y-3 max-h-56 overflow-auto text-slate-300">
              {cravings.map(c=> (
                <li key={c.id} className="rounded-3xl border border-white/5 bg-white/5 p-3 text-sm">
                  <span className="block font-semibold text-white">Intensity {c.intensity}</span>
                  <span>{new Date(c.occurred_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">No cravings recorded yet. Use the slider and tap record to log your next urge.</p>
          )}
        </div>
      </div>
    </section>
  )
}
