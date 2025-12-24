import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || ''

  try {
    await requireAdmin(cookie)
  } catch {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const [ticketStats, crewStats] = await Promise.all([
    supabase.from('ticket_stats').select('*').single(),
    supabase.from('crew_stats').select('*'),
  ])

  if (ticketStats.error || crewStats.error) {
    console.error('Stats error:', ticketStats.error || crewStats.error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  return NextResponse.json({
    tickets: ticketStats.data,
    crews: crewStats.data,
  })
}
