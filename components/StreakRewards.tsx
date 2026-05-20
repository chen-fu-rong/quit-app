"use client"
import { useEffect, useMemo, useState } from 'react'
import { getSupabaseClient } from '../lib/supabase/client'

const milestones = [1, 3, 7, 14, 30, 60, 90]

export default function StreakRewards() {
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [days, setDays] = useState<number | null>(null)
  const [activeAgo, setActiveAgo] = useState('')
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
        console.error('fetch streak reward error', error)
      }

      if (mounted) {
        if (data?.start_date) {
          const startDate = new Date(data.start_date)
          const elapsedMs = Math.max(0, Date.now() - startDate.getTime())
          const count = Math.floor(elapsedMs / (1000 * 60 * 60 * 24))
          setDays(count)
          setActiveAgo(startDate.toLocaleDateString())
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
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Streak rewards</p>
        <p className="mt-4 text-slate-400">Loading your streak...</p>
      </section>
    )
  }

  if (days === null) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Streak rewards</p>
        <p className="mt-4 text-slate-400">Set a quit date or login to see your streak rewards.</p>
      </section>
    )
  }

  const nextMilestone = milestones.find((milestone) => milestone > days) ?? milestones[milestones.length - 1]
  const progress = Math.min(100, Math.round((days / nextMilestone) * 100))

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Streak rewards</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Keep your quit momentum</h2>
        </div>
        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-200">
          {days} days
        </span>
      </div>

      <p className="text-slate-300">Your current streak started on {activeAgo}. The next reward is at {nextMilestone} days.</p>

      <div className="mt-6 rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">
        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
          <span>{progress}% to next reward</span>
          <span>{nextMilestone - days} days left</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {milestones.slice(0, 4).map((milestone) => (
          <div key={milestone} className={`rounded-3xl p-4 ring-1 ${milestone <= days ? 'bg-emerald-500/10 ring-emerald-400/20' : 'bg-white/5 ring-white/10'}`}>
            <p className="text-sm text-slate-300">{milestone} days</p>
            <p className={`mt-2 text-lg font-semibold ${milestone <= days ? 'text-emerald-200' : 'text-white'}`}>{milestone <= days ? 'Unlocked' : 'Upcoming'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
