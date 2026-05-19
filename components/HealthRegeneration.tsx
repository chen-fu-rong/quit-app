"use client"
import { useEffect, useState } from 'react'

type Props = { quitDate: string }

const HEALTH_MILESTONES = [
  {
    label: 'Heart rate & blood pressure begin to normalize 🫀',
    durationMs: 20 * 60 * 1000,
  },
  {
    label: 'Carbon monoxide drops, oxygen improves 🌬️',
    durationMs: 8 * 60 * 60 * 1000,
  },
  {
    label: 'Nicotine clears from your bloodstream 🩸',
    durationMs: 24 * 60 * 60 * 1000,
  },
  {
    label: 'Taste and smell start to recover 👅',
    durationMs: 48 * 60 * 60 * 1000,
  },
  {
    label: 'Breathing becomes easier and lungs relax 🫁',
    durationMs: 72 * 60 * 60 * 1000,
  },
  {
    label: 'Energy levels rise and withdrawal eases ⚡',
    durationMs: 7 * 24 * 60 * 60 * 1000,
  },
  {
    label: 'Circulation improves, walking feels lighter 🏃',
    durationMs: 14 * 24 * 60 * 60 * 1000,
  },
  {
    label: 'Coughing decreases, lung function strengthens 💨',
    durationMs: 30 * 24 * 60 * 60 * 1000,
  },
  {
    label: 'Heart disease risk drops by about half ❤️',
    durationMs: 365 * 24 * 60 * 60 * 1000,
  },
]

export default function HealthRegeneration({ quitDate }: Props) {
  const [now, setNow] = useState(new Date())
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!quitDate) return null

  const elapsedMs = Math.max(0, now.getTime() - new Date(quitDate).getTime())

  const completedCount = HEALTH_MILESTONES.filter((m) => elapsedMs >= m.durationMs).length
  const activeIndex = HEALTH_MILESTONES.findIndex((m) => elapsedMs < m.durationMs)

  const visibleMilestones = showAll
    ? HEALTH_MILESTONES
    : HEALTH_MILESTONES.filter((_, i) => {
        if (activeIndex === -1) return i >= HEALTH_MILESTONES.length - 4
        return i >= Math.max(0, activeIndex - 1) && i <= activeIndex + 2
      })

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Body Recovery</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Health Regeneration</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Science-backed recovery milestones from the first minutes to the first year smoke-free.
            You can see how your body rebuilds itself across the most important early stages.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-200 ring-1 ring-white/10">
            {completedCount} of {HEALTH_MILESTONES.length} milestones complete
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20 hover:text-white"
          >
            {showAll ? 'Show less' : 'View all'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {visibleMilestones.map((m) => {
          const progress = Math.max(0, Math.min(100, (elapsedMs / m.durationMs) * 100))
          const isComplete = progress >= 100
          const milestoneIndex = HEALTH_MILESTONES.indexOf(m)
          const isActive = milestoneIndex === activeIndex || (activeIndex === -1 && milestoneIndex === HEALTH_MILESTONES.length - 1)

          return (
            <div key={m.label} className="space-y-2">
              <div className="flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-3 w-3 rounded-full ${isComplete ? 'bg-green-400' : isActive ? 'bg-cyan-400' : 'bg-slate-700'}`}
                  />
                  <span className={isComplete ? 'text-green-300 font-medium' : 'text-slate-300 font-medium'}>
                    {m.label}
                  </span>
                </div>
                <span className={isComplete ? 'text-green-400 font-bold' : 'text-slate-400 font-semibold'}>
                  {Math.floor(progress)}%
                </span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10">
                <div
                  className={
                    'absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ' +
                    (isComplete
                      ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.35)]'
                      : 'bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_20px_rgba(168,85,247,0.25)]')
                  }
                  style={{ width: `${progress}%`, willChange: 'width' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
