"use client"
import { useEffect, useState } from 'react'

type Props = { quitDate: string }

const HEALTH_MILESTONES = [
  { label: 'Heart rate normalizes', durationMs: 20 * 60 * 1000 },
  { label: 'Carbon monoxide drops', durationMs: 12 * 60 * 60 * 1000 },
  { label: 'Nicotine cleared from body', durationMs: 3 * 24 * 60 * 60 * 1000 },
  { label: 'Lung function improves', durationMs: 14 * 24 * 60 * 60 * 1000 },
]

export default function HealthRegeneration({ quitDate }: Props) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    // update every 10 seconds
    const interval = setInterval(() => setNow(new Date()), 10000) 
    return () => clearInterval(interval)
  }, [])

  if (!quitDate) return null

  const elapsedMs = Math.max(0, now.getTime() - new Date(quitDate).getTime())

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Body Recovery</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Health Regeneration</h2>
      </div>
      <div className="space-y-6">
        {HEALTH_MILESTONES.map((m, i) => {
          const progress = Math.min(100, (elapsedMs / m.durationMs) * 100)
          const isComplete = progress >= 100
          
          return (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={isComplete ? "text-green-400 font-medium flex items-center gap-2" : "text-slate-300 font-medium"}>
                  {isComplete && '✓'} {m.label}
                </span>
                <span className={isComplete ? "text-green-400" : "text-slate-400"}>
                  {Math.floor(progress)}%
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10">
                <div 
                  className={`h-full transition-all duration-1000 ${isComplete ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-violet-500'}`}
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
