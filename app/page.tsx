import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex rounded-full bg-violet-500/15 px-4 py-1 text-sm font-semibold text-violet-200 ring-1 ring-violet-400/20">
                iPhone 16 Pro-ready • responsive • clean UX
              </p>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Quit Faster with a calm, mobile-first tracker.
                </h1>
                <p className="max-w-2xl text-slate-300 sm:text-lg">
                  Keep your quit date, cravings, and savings all in one beautiful dashboard built for modern phones and responsive screens.
                </p>
              </div>
              <div className="grid gap-3 sm:flex sm:flex-row sm:items-center">
                <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
                  Open Dashboard
                </Link>
                <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400 hover:text-white">
                  Login / Signup
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-slate-950/90 p-5 ring-1 ring-white/10 shadow-xl shadow-black/20">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Progress</p>
                <p className="mt-4 text-3xl font-semibold text-white">14 days</p>
                <p className="mt-2 text-sm text-slate-400">Track your streak and stay motivated.</p>
              </div>
              <div className="rounded-[2rem] bg-slate-950/90 p-5 ring-1 ring-white/10 shadow-xl shadow-black/20">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Savings</p>
                <p className="mt-4 text-3xl font-semibold text-white">MMK 42,000</p>
                <p className="mt-2 text-sm text-slate-400">See how much money you&apos;re keeping.</p>
              </div>
              <div className="rounded-[2rem] bg-slate-950/90 p-5 ring-1 ring-white/10 shadow-xl shadow-black/20 sm:col-span-2">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Cravings</p>
                <p className="mt-4 text-3xl font-semibold text-white">9 recorded</p>
                <p className="mt-2 text-sm text-slate-400">Log every urge with confidence.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
