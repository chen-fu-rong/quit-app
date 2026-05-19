"use client"
import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import MoneySavedCalculator from './MoneySavedCalculator'
import { getSupabaseClient } from '../lib/supabase/client'

export default function QuitTracker({ onQuitDateChange }: { onQuitDateChange?: (date: string) => void }) {
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [quitDate, setQuitDate] = useState<string>('')
  const [inputDate, setInputDate] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [now, setNow] = useState(new Date())
  const [showRelapseWarning, setShowRelapseWarning] = useState(false)

  function formatAsLocalInput(value: string) {
    const date = new Date(value)
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return local.toISOString().slice(0, 16)
  }

  function normalizeLocalInputToUtc(value: string) {
    return new Date(value).toISOString()
  }

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

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
        setQuitDate(data.start_date)
        setInputDate(formatAsLocalInput(data.start_date))
        if (onQuitDateChange) onQuitDateChange(data.start_date)
      }

      setLoading(false)
    }

    load()
    return () => { mounted = false }
  }, [supabase])

  const diff = quitDate ? Math.max(0, now.getTime() - new Date(quitDate).getTime()) : 0
  const daysSince = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hoursSince = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutesSince = Math.floor((diff / 1000 / 60) % 60)
  const secondsSince = Math.floor((diff / 1000) % 60)

  async function applyDate() {
    if (!inputDate) return
    setLoading(true)

    try {
      const { data: { session }, error: sessionErr } = await supabase.auth.getSession()
      const token = session?.access_token
      if (sessionErr || !token) {
        alert('Please sign in to save your quit date')
        setLoading(false)
        return
      }

      const utcStartDate = normalizeLocalInputToUtc(inputDate)
      const res = await fetch('/api/quit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ start_date: utcStartDate }),
      })

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`)
      }
      
      const json = await res.json()
      if (json.error) {
        throw new Error(json.error)
      }
      
      const savedStartDate = json.data?.start_date || utcStartDate
      setQuitDate(savedStartDate)
      setInputDate(formatAsLocalInput(savedStartDate))
      if (onQuitDateChange) onQuitDateChange(savedStartDate)
    } catch (err) {
      console.error('insert quit attempt error', err)
      alert('Failed to save quit date. Please check Vercel environment variables (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY).')
    } finally {
      setLoading(false)
    }
  }

  async function clearDate() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('quit_attempts').update({ status: 'relapsed' }).eq('user_id', user.id).eq('status', 'active')
    setQuitDate('')
    setInputDate('')
    setShowRelapseWarning(false)
    if (onQuitDateChange) onQuitDateChange('')
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
            <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300 ring-1 ring-white/10 flex flex-col justify-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Quit date</p>
              <p className="mt-3 text-lg font-semibold text-white">{format(new Date(quitDate), 'PPp')}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Time without smoking / vaping</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
                <div className="flex flex-col items-center justify-center"><span className="text-xl sm:text-2xl font-semibold text-white">{daysSince}</span><span className="text-[10px] sm:text-xs uppercase text-slate-500">days</span></div>
                <div className="flex flex-col items-center justify-center"><span className="text-xl sm:text-2xl font-semibold text-white">{hoursSince}</span><span className="text-[10px] sm:text-xs uppercase text-slate-500">hrs</span></div>
                <div className="flex flex-col items-center justify-center"><span className="text-xl sm:text-2xl font-semibold text-white">{minutesSince}</span><span className="text-[10px] sm:text-xs uppercase text-slate-500">mins</span></div>
                <div className="flex flex-col items-center justify-center"><span className="text-xl sm:text-2xl font-semibold text-white">{secondsSince}</span><span className="text-[10px] sm:text-xs uppercase text-slate-500">secs</span></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="flex-1 rounded-3xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400" onClick={() => setShowRelapseWarning(true)}>
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
            <input type="datetime-local" value={inputDate} onChange={(e)=>setInputDate(e.target.value)} className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-400" />
            <button className="w-full rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 sm:w-auto" onClick={applyDate}>
              Set Quit Date
            </button>
          </div>
        </div>
      )}

      {showRelapseWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] bg-slate-900 p-8 shadow-2xl ring-1 ring-white/10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Are you absolutely sure?</h2>
            <p className="text-slate-300 mb-6">
              You are about to throw away <strong>{daysSince > 0 ? `${daysSince} days` : `${hoursSince} hours`}</strong> of hard work, reset your health recovery, and lose your streak. The craving will pass, but starting over from zero hurts.
            </p>
            <div className="flex flex-col gap-3">
              <button className="rounded-full bg-violet-500 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400" onClick={() => setShowRelapseWarning(false)}>
                I won't give up
              </button>
              <button className="rounded-full px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white" onClick={clearDate}>
                Yes, I relapsed
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
