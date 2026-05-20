"use client"
import { useEffect, useMemo, useState } from 'react'
import { getSupabaseClient } from '../lib/supabase/client'

export default function JourneyTimeline() {
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [days, setDays] = useState<number | null>(null)
  const [startDate, setStartDate] = useState<string | null>(null)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        if (mounted) setLoaded(true)
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
        console.error('fetch journey timeline error', error)
      }

      if (mounted) {
        if (data?.start_date) {
          const start = new Date(data.start_date)
          const elapsedMs = Math.max(0, Date.now() - start.getTime())
          setDays(Math.floor(elapsedMs / (1000 * 60 * 60 * 24)))
          setStartDate(start.toLocaleDateString())
        }
        setLoaded(true)
      }
    }

    load()
    return () => { mounted = false }
  }, [supabase])

  if (!loaded) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Journey timeline</p>
        <p className="mt-4 text-slate-400">Loading your quit timeline...</p>
      </section>
    )
  }

  if (days === null || !startDate) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Journey timeline</p>
        <p className="mt-4 text-slate-400">Set a quit date or login to see your journey milestones.</p>
      </section>
    )
  }

  const timeline = [
    {
      time: 'Day 1',
      description: 'Your quit journey begins. Every hour without a cigarette counts.',
    },
    {
      time: 'Day 7',
      description: days >= 7 ? 'First full week smoke-free. You are building a stronger habit.' : 'Keep going — the first week is a big milestone.',
    },
    {
      time: 'Day 14',
      description: days >= 14 ? 'Two weeks free — your body and mind are adapting.' : 'Soon you’ll hit two smoke-free weeks.',
    },
    {
      time: 'Today',
      description: `Your streak is ${days} day${days === 1 ? '' : 's'} and the next reward is just ahead.`,
    },
  ]

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Journey timeline</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">See the next milestones</h2>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200">Started {startDate}</span>
      </div>

      <ol className="space-y-5">
        {timeline.map((item) => (
          <li key={item.time} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
            <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
              <span className="font-semibold text-white">{item.time}</span>
            </div>
            <p className="mt-3 text-slate-300">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
