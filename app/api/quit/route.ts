import { NextResponse } from 'next/server'
import { getSupabaseServer } from '../../../lib/supabase/server'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ error: 'Missing authorization' }, { status: 401 })
  const token = authHeader.replace('Bearer ', '')
  const supabaseServer = getSupabaseServer()
  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
  if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  const user = userData.user

  const body = await request.json()
  const { start_date } = body
  if (!start_date) return NextResponse.json({ error: 'start_date required' }, { status: 400 })

  const { data, error } = await supabaseServer.from('quit_attempts').insert({ user_id: user.id, start_date }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
