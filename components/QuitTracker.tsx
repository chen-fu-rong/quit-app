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
      body: JSON.stringify({ start_date: inputDate }),
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

    await supabase.from('quit_attempts').update({ status: 'relapsed' }).eq('user_id', user.id).eq('status', 'active')
    setQuitDate('')
    setInputDate('')
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Quit Tracker</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Your smoke-free timeline</h2>
        </div>
        <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">
          {quitDate ? `${daysSince} days` : 'No active quit yet'}
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-slate-950/90 p-6 text-center text-slate-300">Loading your quit details...</div>
      ) : quitDate ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Quit date</p>
              <p className="mt-3 text-lg font-semibold text-white">{format(new Date(quitDate), 'PPP')}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Days without vaping</p>
              <p className="mt-3 text-lg font-semibold text-white">{daysSince}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="flex-1 rounded-3xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400" onClick={clearDate}>
              Mark Relapse
            </button>
            <div className="flex-1 rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/10">
              Keep going — every day counts.
            </div>
          </div>
          <MoneySavedCalculator days={daysSince} />
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-slate-300">No quit date set yet. Choose your start date below to begin tracking progress and savings.</p>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <input type="date" value={inputDate} onChange={(e)=>setInputDate(e.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-400" />
            <button className="rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400" onClick={applyDate}>
              Set Quit Date
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
