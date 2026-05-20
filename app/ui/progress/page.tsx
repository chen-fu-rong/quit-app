import Link from 'next/link'

export default function ProgressPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Progress UI</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Visualize your quit progress clearly
          </h1>
          <p className="mt-4 text-slate-300 sm:text-lg">
            Progress visualization gives users a clear sense of momentum with streaks, savings totals, and health regeneration summaries.
          </p>
        </section>

        <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-black/20">
          <div>
            <h2 className="text-2xl font-semibold text-white">Focus areas</h2>
            <p className="mt-3 text-slate-400">
              Progress pages are designed around key metrics that reward persistence and make the quit journey feel tangible.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Streak</p>
              <p className="mt-4 text-3xl font-semibold text-white">14 days</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Savings</p>
              <p className="mt-4 text-3xl font-semibold text-white">MMK 42,000</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Health</p>
              <p className="mt-4 text-3xl font-semibold text-white">Improving</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href="/ui" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400">
            Back to UI Hub
          </Link>
          <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
            Open Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
