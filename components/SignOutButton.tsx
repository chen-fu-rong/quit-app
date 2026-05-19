"use client"
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '../lib/supabase/client'

export default function SignOutButton() {
  const supabase = getSupabaseClient()
  const router = useRouter()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-red-400 hover:text-red-400"
    >
      Sign Out
    </button>
  )
}
