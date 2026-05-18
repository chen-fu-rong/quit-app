import { NextResponse } from 'next/server'
import { getSupabaseServer } from '../../../lib/supabase/server'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ error: 'Missing authorization' }, { status: 401 })
  const token = authHeader.replace('Bearer ', '')
  const supabaseServer = getSupabaseServer()
  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
  if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  const user = userData.user

  const { data, error } = await supabaseServer.from('user_quit_stats').select('*').eq('user_id', user.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
