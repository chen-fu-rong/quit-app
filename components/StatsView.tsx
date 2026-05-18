"use client"
import { useEffect, useMemo, useState } from 'react'
import { getSupabaseClient } from '../lib/supabase/client'

type QuitStat = {
  attempt_id: string
  attempt_number: number
  days_since_start: number
  total_cravings: number
}

export default function StatsView(){
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [stats, setStats] = useState<QuitStat[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (!token) { setLoading(false); return }
      const res = await fetch('/api/stats', { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) { setLoading(false); return }
      const json = await res.json()
      setStats(json.data || [])
      setLoading(false)
    }
    load()
  }, [supabase])

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Weekly overview</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Quit stats</h2>
        </div>
        <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">
          {loading ? 'Refreshing...' : `${stats.length} attempts`}
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-300">Loading progress...</div>
      ) : stats.length ? (
        <div className="space-y-3">
          {stats.map((s) => (
            <article key={s.attempt_id} className="rounded-3xl border border-white/5 bg-white/5 p-4 text-slate-300">
              <p className="text-sm text-slate-400">Attempt {s.attempt_number}</p>
              <p className="mt-2 font-semibold text-white">{s.days_since_start} days smoke-free</p>
              <p className="mt-1 text-sm">Cravings recorded: {s.total_cravings}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-300">No stats yet. Set your quit date and log cravings to see progress here.</div>
      )}
    </section>
  )
}
