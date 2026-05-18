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
  const { intensity } = body
  if (!intensity) return NextResponse.json({ error: 'intensity required' }, { status: 400 })

  // attempt_id is optional
  const attempt_id = body.attempt_id || null

  const { data, error } = await supabaseServer.from('cravings').insert({ user_id: user.id, intensity, attempt_id }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
