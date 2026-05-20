import Link from 'next/link'

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Dashboard hub</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Explore dashboard UX concepts page by page
              </h1>
              <p className="max-w-2xl text-slate-300 sm:text-lg">
                Instead of one long dashboard, each major section now lives on its own screen for better focus and cleaner navigation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/progress" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
                Progress page
              </Link>
              <Link href="/dashboard/cravings" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
                Cravings page
              </Link>
              <Link href="/dashboard/motivation" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
                Motivation page
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-3">
          <Link href="/dashboard/progress" className="group rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 transition hover:border-violet-400 hover:bg-slate-900/95">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Progress</p>
            <h2 className="mt-4 text-2xl font-semibold text-white group-hover:text-violet-300">Timeline, health, and stats</h2>
            <p className="mt-3 text-slate-400">Focus on the quit tracker, health milestones, and progress summary.</p>
          </Link>
          <Link href="/dashboard/cravings" className="group rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 transition hover:border-violet-400 hover:bg-slate-900/95">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Cravings</p>
            <h2 className="mt-4 text-2xl font-semibold text-white group-hover:text-violet-300">Interactive craving tools</h2>
            <p className="mt-3 text-slate-400">Log urges quickly and use playful feedback to stay on track.</p>
          </Link>
          <Link href="/dashboard/motivation" className="group rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 transition hover:border-violet-400 hover:bg-slate-900/95">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Motivation</p>
            <h2 className="mt-4 text-2xl font-semibold text-white group-hover:text-violet-300">Encouragement and daily tips</h2>
            <p className="mt-3 text-slate-400">Keep motivation visible with daily reminders and supportive messaging.</p>
          </Link>
        </section>
      </div>
    </main>
  )
}
