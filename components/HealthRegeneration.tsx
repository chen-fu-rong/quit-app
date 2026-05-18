"use client"
import { useEffect, useState } from 'react'

type Props = { quitDate: string }

const HEALTH_MILESTONES = [
  { label: 'Heart rate & blood pressure normalize 🫀', durationMs: 20 * 60 * 1000 },
  { label: 'Carbon monoxide drops to normal 🌬️', durationMs: 8 * 60 * 60 * 1000 },
  { label: 'Nicotine cleared from bloodstream 🩸', durationMs: 24 * 60 * 60 * 1000 },
  { label: 'Senses of smell & taste improve 👅', durationMs: 2 * 24 * 60 * 60 * 1000 },
  { label: 'Breathing becomes easier 🫁', durationMs: 3 * 24 * 60 * 60 * 1000 },
  { label: 'Energy levels soar ⚡', durationMs: 7 * 24 * 60 * 60 * 1000 },
  { label: 'Blood circulation & lung function boost 🏃', durationMs: 14 * 24 * 60 * 60 * 1000 },
  { label: 'Coughing & shortness of breath drop 💨', durationMs: 30 * 24 * 60 * 60 * 1000 },
  { label: 'Heart disease risk halved ❤️', durationMs: 365 * 24 * 60 * 60 * 1000 },
]

export default function HealthRegeneration({ quitDate }: Props) {
  const [now, setNow] = useState(new Date())
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 10000) 
    return () => clearInterval(interval)
  }, [])

  if (!quitDate) return null

  const elapsedMs = Math.max(0, now.getTime() - new Date(quitDate).getTime())

  // Find current active milestone
  const activeIndex = HEALTH_MILESTONES.findIndex(m => elapsedMs < m.durationMs)
  
  // Decide which milestones to show
  const visibleMilestones = showAll ? HEALTH_MILESTONES : HEALTH_MILESTONES.filter((_, i) => {
    if (activeIndex === -1) return i >= HEALTH_MILESTONES.length - 4 // Show last 4 if all complete
    return i >= Math.max(0, activeIndex - 1) && i <= activeIndex + 2
  })

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Body Recovery</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Health Regeneration</h2>
        </div>
        <button onClick={() => setShowAll(!showAll)} className="text-sm font-semibold text-violet-400 transition hover:text-violet-300">
          {showAll ? 'Show less' : 'View all'}
        </button>
      </div>
      <div className="space-y-6">
        {visibleMilestones.map((m) => {
          const progress = Math.min(100, (elapsedMs / m.durationMs) * 100)
          const isComplete = progress >= 100
          
          return (
            <div key={m.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={isComplete ? "text-green-400 font-medium flex items-center gap-2" : "text-slate-300 font-medium"}>
                  {isComplete && '✓'} {m.label}
                </span>
                <span className={isComplete ? "text-green-400 font-bold" : "text-slate-400"}>
                  {Math.floor(progress)}%
                </span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10">
                <div 
                  className={`absolute left-0 top-0 h-full transition-all duration-1000 ${isComplete ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gradient-to-r from-violet-600 to-fuchsia-500'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
