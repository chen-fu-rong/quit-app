"use client"
import { useEffect, useState } from 'react'

type Props = { days: number }

export default function MoneySavedCalculator({ days }: Props) {
  const [dailySpend, setDailySpend] = useState<number>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('dailySpendMMK') : null
    return s ? Number(s) : 3000
  })

  useEffect(() => {
    localStorage.setItem('dailySpendMMK', String(dailySpend))
  }, [dailySpend])

  const saved = days * dailySpend

  return (
    <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10 text-slate-200">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-semibold text-white">Money Saved</h3>
          <p className="text-sm text-slate-400">Update your daily spend on cigarettes or pods to see savings.</p>
        </div>
        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-200">
          Estimate
        </span>
      </div>
      <div className="mt-4">
        <label className="space-y-2 text-sm text-slate-300 block">
          <span>Average daily spend (MMK)</span>
          <input type="number" value={dailySpend} onChange={e=>setDailySpend(Number(e.target.value))} className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-400" />
        </label>
      </div>
      <p className="mt-5 text-base text-slate-100">
        Estimated money saved: <strong className="text-white">MMK {new Intl.NumberFormat().format(saved)}</strong>
      </p>
    </div>
  )
}
