"use client"
export const dynamic = 'force-dynamic'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { getSupabaseClient } from '../../../lib/supabase/client'

export default function SignupPage() {
  const supabase = getSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard')
    })

    // Listen for login events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) router.push('/dashboard')
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Get started</p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Create your account and start tracking today.
            </h1>
            <p className="mx-auto max-w-2xl text-slate-400 sm:text-lg">
              Designed for iPhone 16 Pro and responsive screens, your quit journey is front and center.
            </p>
          </div>
        </section>
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mx-auto max-w-md">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
          </div>
        </section>
      </div>
    </main>
  )
}
