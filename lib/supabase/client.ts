import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

export function getSupabaseClient() {
  if (_supabase) return _supabase
  if (typeof window === 'undefined') {
    const dummy = new Proxy({}, {
      get() { return () => { throw new Error('Supabase client used during server render — call getSupabaseClient only in client-side code.') } }
    }) as unknown as SupabaseClient
    _supabase = dummy
    return _supabase
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}
