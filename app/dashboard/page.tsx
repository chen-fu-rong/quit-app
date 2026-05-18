import Link from 'next/link'
import QuitTracker from '../../components/QuitTracker'
import CravingCounter from '../../components/CravingCounter'
import CravingCrusher from '../../components/CravingCrusher'
import StatsView from '../../components/StatsView'
import SignOutButton from '../../components/SignOutButton'

const dailyTips = [
  'Drink a glass of water when a craving hits — hydration helps reset the urge.',
  'Take a 5-minute walk and focus on breathing slowly to calm your body.',
  'Write down one reason you quit and review it when motivation dips.',
  'Celebrate every smoke-free day with a small reward you enjoy.',
]

function randomTip() {
  return dailyTips[Math.floor(Math.random() * dailyTips.length)]
}

export default function DashboardPage() {
  const tip = randomTip()

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Quit journey</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Your personal smoke-free dashboard
              </h1>
              <p className="max-w-2xl text-slate-300 sm:text-lg">
                Manage cravings, stay on track, and visualize the progress of your quit attempt with an iPhone-optimized experience.
              </p>
            </div>
              <div className="flex flex-wrap gap-3">
              <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400">
                Login / Signup
              </Link>
              <SignOutButton />
              <Link href="/" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400">
                Home
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="grid gap-6 content-start">
            <QuitTracker />
            <StatsView />
          </div>
          <div className="grid gap-6 content-start">
            <CravingCrusher />
            <CravingCounter />
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Daily motivation</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Tip for Today</h2>
              <p className="mt-4 text-slate-300">{tip}</p>
              <div className="mt-6 rounded-3xl bg-white/5 p-4 text-sm text-slate-300 ring-1 ring-white/10">
                Use your phone like a coach — quick check-ins, fast logs, and soft reminders keep your routine strong.
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
