"use client"
import { useState } from 'react'
import Link from 'next/link'
import QuitTracker from '../../../components/QuitTracker'
import HealthRegeneration from '../../../components/HealthRegeneration'
import StatsView from '../../../components/StatsView'

export default function DashboardProgressPage() {
  const [quitDate, setQuitDate] = useState<string>('')

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Progress</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Progress-first dashboard page
              </h1>
              <p className="max-w-2xl text-slate-300 sm:text-lg">
                Track your quit date, health recovery milestones, and progress statistics on one focused screen.
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

        <div className="grid gap-6">
          <QuitTracker onQuitDateChange={setQuitDate} />
          <HealthRegeneration quitDate={quitDate} />
          <StatsView />
        </div>
      </div>
    </main>
  )
}
