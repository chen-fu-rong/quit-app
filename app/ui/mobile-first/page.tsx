import Link from 'next/link'

export default function MobileFirstPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Responsive design</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Mobile-first UI for quicker focus
          </h1>
          <p className="mt-4 text-slate-300 sm:text-lg">
            The Quit app is designed for phone-first use, with readable cards, generous spacing, and controls that feel calm and easy to interact with.
          </p>
        </section>

        <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-black/20">
          <div>
            <h2 className="text-2xl font-semibold text-white">Why mobile-first matters</h2>
            <p className="mt-3 text-slate-400">
              Users often open the quit tracker during cravings or while on the move, so each page is optimized for fast scanning, thumb-friendly layout, and minimal distractions.
            </p>
          </div>
          <ul className="grid gap-3 text-slate-300 sm:grid-cols-2">
            <li className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/10">Large tap targets for fast navigation</li>
            <li className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/10">High contrast text for readability</li>
            <li className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/10">Compact summary cards for key metrics</li>
            <li className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/10">Stacked layout that works on small screens</li>
          </ul>
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
