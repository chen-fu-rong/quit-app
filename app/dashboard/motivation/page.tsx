"use client"
import { useState } from 'react'
import Link from 'next/link'

const tips = [
  'Take a short walk and reward yourself for choosing not to smoke.',
  'Drink water and breathe deeply when a craving starts — it helps the urge pass.',
  'Celebrate each smoke-free hour with a small win in your journal.',
  'Ask a friend for encouragement when you feel the urge to vape again.',
]

function randomTip() {
  return tips[Math.floor(Math.random() * tips.length)]
}

export default function DashboardMotivationPage() {
  const [tip] = useState(randomTip())

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Motivation</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Motivation-first screen
              </h1>
              <p className="max-w-2xl text-slate-300 sm:text-lg">
                A dedicated motivation page keeps support and encouragement front and center for every step of the quit journey.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400">
                Dashboard overview
              </Link>
              <Link href="/dashboard/cravings" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
                Cravings page
              </Link>
            </div>
          </div>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Daily motivation</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Tip for today</h2>
          <p className="mt-4 text-slate-300 text-lg">{tip}</p>
          <div className="mt-6 rounded-3xl bg-white/5 p-6 text-slate-300 ring-1 ring-white/10">
            Keep your focus on the small wins, not perfection. Every craving logged is progress toward a stronger you.
          </div>
        </section>
      </div>
    </main>
  )
}
