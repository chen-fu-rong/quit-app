"use client"
import { useEffect, useState } from 'react'

type Props = { days: number }

export default function MoneySavedCalculator({ days }: Props) {
  const [dailySpend, setDailySpend] = useState<number>(() => {
    if (typeof window === 'undefined') return 3000
    const stored = window.localStorage.getItem('dailySpendMMK')
    return stored ? Number(stored) : 3000
  })
  const [goal, setGoal] = useState<number>(() => {
    if (typeof window === 'undefined') return 100000
    const stored = window.localStorage.getItem('savingsGoalMMK')
    return stored ? Number(stored) : 100000
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('dailySpendMMK', String(dailySpend))
  }, [dailySpend])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('savingsGoalMMK', String(goal))
  }, [goal])

  const safeGoal = goal > 0 ? goal : 1
  const saved = days * dailySpend
  const progress = Math.min(100, Math.round((saved / safeGoal) * 100))

  return (
    <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10 text-slate-200">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-semibold text-white">Money Saved</h3>
          <p className="text-sm text-slate-400">Update your daily spend and set a savings goal to stay motivated.</p>
        </div>
        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-200">
          Estimate
        </span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300 block">
          <span>Average daily spend (MMK)</span>
          <input
            type="number"
            value={dailySpend}
            onChange={(e) => setDailySpend(Number(e.target.value))}
            className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-400"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300 block">
          <span>Savings goal (MMK)</span>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-400"
          />
        </label>
      </div>

      <div className="mt-5 rounded-3xl bg-slate-950/90 p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Saved so far</span>
          <span>{progress}% of goal</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="mt-5 text-base text-slate-100">
        Estimated money saved: <strong className="text-white">MMK {new Intl.NumberFormat().format(saved)}</strong>
      </p>
      <p className="mt-2 text-sm text-slate-400">
        Goal: MMK {new Intl.NumberFormat().format(goal)}
      </p>
    </div>
  )
}
