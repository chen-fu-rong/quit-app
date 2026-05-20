import Link from 'next/link'

export default function UIHubPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">UI / UX concepts</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Explore Quit UI/UX concepts page by page
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300 sm:text-lg">
            The experience is now divided into focused sections for responsive layout, progress visualization, craving interaction, and motivation feedback.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          {[
            {
              title: 'Mobile-first design',
              description: 'Learn how responsive layout and phone-friendly spacing create a calm, accessible quit tracker experience.',
              href: '/ui/mobile-first',
            },
            {
              title: 'Progress visualization',
              description: 'See how streaks, savings, and health regeneration help users understand progress at a glance.',
              href: '/ui/progress',
            },
            {
              title: 'Craving interaction',
              description: 'Discover a UI built for fast craving logging, positive feedback, and habit reinforcement.',
              href: '/ui/cravings',
            },
            {
              title: 'Motivation feedback',
              description: 'Focus on emotional support with tips, reminders, and encouraging content for every quit day.',
              href: '/ui/motivation',
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-[2rem] border border-white/10 bg-slate-950/90 p-7 transition hover:border-violet-400 hover:bg-slate-900/95"
            >
              <h2 className="text-2xl font-semibold text-white group-hover:text-violet-300">{card.title}</h2>
              <p className="mt-3 text-slate-400">{card.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-200">
                Explore
              </span>
            </Link>
          ))}
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
            Open Dashboard
          </Link>
          <Link href="/" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400 hover:text-white">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
