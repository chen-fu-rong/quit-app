"use client"
import Link from 'next/link'
import CravingCrusher from '../../../components/CravingCrusher'
import CravingCounter from '../../../components/CravingCounter'

export default function DashboardCravingsPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Cravings</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Cravings-specific UI/UX flow
              </h1>
              <p className="max-w-2xl text-slate-300 sm:text-lg">
                Log urges quickly, get fast feedback, and use a focused screen designed for craving support.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400">
                Dashboard overview
              </Link>
              <Link href="/dashboard/progress" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
                Progress page
              </Link>
            </div>
          </div>
        </header>

        <div className="grid gap-6">
          <CravingCrusher />
          <CravingCounter />
        </div>
      </div>
    </main>
  )
}
