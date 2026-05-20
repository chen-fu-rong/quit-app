import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-violet-500/15 px-4 py-1 text-sm font-semibold text-violet-200 ring-1 ring-violet-400/20">
              Split into concept pages for a cleaner flow
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Quit UI/UX concepts, one page at a time
              </h1>
              <p className="max-w-2xl text-slate-300 sm:text-lg">
                Instead of one long home page, the app now guides users through focused screens for responsive design, progress, craving interaction, and motivation.
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-row sm:items-center">
              <Link href="/ui" className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
                Explore UI concepts
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400 hover:text-white">
                Open Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
