import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabaseServer: SupabaseClient | null = null

export function getSupabaseServer() {
  if (_supabaseServer) return _supabaseServer
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase server environment variables')
  }
  _supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey)
  return _supabaseServer
 }

