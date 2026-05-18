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

  if (loading) return <p>Loading stats...</p>
  if (!stats.length) return <p>No stats yet.</p>

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-medium mb-2">Stats</h3>
      <ul className="text-sm space-y-2">
        {stats.map(s=> (
          <li key={s.attempt_id}>Attempt {s.attempt_number} — Days since: {s.days_since_start} — Cravings: {s.total_cravings}</li>
        ))}
      </ul>
    </div>
  )
}
