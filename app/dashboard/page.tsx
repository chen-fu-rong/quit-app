import Link from 'next/link'
import QuitTracker from '../../components/QuitTracker'
import CravingCounter from '../../components/CravingCounter'
import StatsView from '../../components/StatsView'

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuitTracker />
        <CravingCounter />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsView />
      </div>
      <div className="mt-6">
        <Link href="/" className="text-blue-600">Back home</Link>
      </div>
    </main>
  )
}
