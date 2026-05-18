"use client"
import { useEffect, useState } from 'react'

type Props = { days: number }

export default function MoneySavedCalculator({ days }: Props) {
  const [cigsPerDay, setCigsPerDay] = useState<number>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('cigsPerDay') : null
    return s ? Number(s) : 10
  })
  const [packPrice, setPackPrice] = useState<number>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('packPrice') : null
    return s ? Number(s) : 6
  })

  useEffect(() => {
    localStorage.setItem('cigsPerDay', String(cigsPerDay))
  }, [cigsPerDay])
  useEffect(() => {
    localStorage.setItem('packPrice', String(packPrice))
  }, [packPrice])

  const saved = days * (cigsPerDay / 20) * packPrice

  return (
    <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10 text-slate-200">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-semibold text-white">Money Saved</h3>
          <p className="text-sm text-slate-400">Update your daily habit and price to see savings.</p>
        </div>
        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-200">
          Estimate
        </span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span>Cigs / day</span>
          <input type="number" value={cigsPerDay} onChange={e=>setCigsPerDay(Number(e.target.value))} className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-400" />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Pack price</span>
          <input type="number" value={packPrice} onChange={e=>setPackPrice(Number(e.target.value))} className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-400" />
        </label>
      </div>
      <p className="mt-5 text-base text-slate-100">
        Estimated money saved: <strong className="text-white">${saved.toFixed(2)}</strong>
      </p>
    </div>
  )
}
