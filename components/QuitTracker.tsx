"use client"
import { useEffect, useMemo, useState } from 'react'
import { differenceInDays, format } from 'date-fns'
import MoneySavedCalculator from './MoneySavedCalculator'
import { getSupabaseClient } from '../lib/supabase/client'

export default function QuitTracker() {
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [quitDate, setQuitDate] = useState<string>('')
  const [inputDate, setInputDate] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // fetch active quit attempt for current user
    let mounted = true
    async function load() {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('quit_attempts')
        .select('start_date')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      if (error) {
        console.error('fetch quit attempt error', error)
      }
      if (data && mounted) {
        const dateStr = data.start_date
        setQuitDate(dateStr)
        setInputDate(dateStr)
      }
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [supabase])

  const daysSince = quitDate ? Math.max(0, differenceInDays(new Date(), new Date(quitDate))) : 0

  async function applyDate() {
    if (!inputDate) return
    setLoading(true)
    const { data: { session }, error: sessionErr } = await supabase.auth.getSession()
    const token = session?.access_token
    if (sessionErr || !token) {
      alert('Please sign in to save your quit date')
      setLoading(false)
      return
    }

    const res = await fetch('/api/quit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ start_date: inputDate })
    })
    const json = await res.json()
    if (!res.ok) {
      console.error('insert quit attempt error', json)
      alert('Failed to save quit date')
    } else {
      setQuitDate(inputDate)
    }
    setLoading(false)
  }

  async function clearDate() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    // mark active attempts as relapsed/cleared
    await supabase.from('quit_attempts').update({ status: 'relapsed' }).eq('user_id', user.id).eq('status', 'active')
    setQuitDate('')
    setInputDate('')
  }

  return (
    <section className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Quit Tracker</h2>
      {loading ? <p>Loading...</p> : (
      quitDate ? (
        <div className="space-y-2">
          <p>Quit date: <strong>{format(new Date(quitDate), 'PPP')}</strong></p>
          <p>Days since quit: <strong>{daysSince}</strong></p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={clearDate}>Mark Relapse</button>
          </div>
          <MoneySavedCalculator days={daysSince} />
        </div>
      ) : (
        <div className="space-y-2">
          <p>No quit date set yet.</p>
          <input type="date" value={inputDate} onChange={(e)=>setInputDate(e.target.value)} className="border px-2 py-1 rounded" />
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={applyDate}>Set Quit Date</button>
          </div>
        </div>
      ))}
    </section>
  )
}
