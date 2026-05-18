import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Quit — E-Cigarette Tracker</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded">Dashboard</Link>
        <Link href="/auth/login" className="px-4 py-2 bg-gray-200 rounded">Login / Signup</Link>
      </div>
    </main>
  )
}
