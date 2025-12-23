import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth.server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || ''

  try {
    await requireAdmin(cookie)
  } catch {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const crewId = searchParams.get('crew_id')
  const checkedIn = searchParams.get('checked_in')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = 50
  const offset = (page - 1) * limit

  let query = supabase.from('attendees').select(
    `
      id,
      first_name,
      last_name,
      email,
      crew_id,
      created_at,
      crews(name),
      tickets(checked_in, checked_in_at)
    `,
    { count: 'exact' }
  )

  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`
    )
  }

  if (crewId) {
    query = query.eq('crew_id', parseInt(crewId, 10))
  }

  if (checkedIn === 'true') {
    query = query.eq('tickets.checked_in', true)
  } else if (checkedIn === 'false') {
    query = query.eq('tickets.checked_in', false)
  }

  query = query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('Failed to fetch attendees:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  const attendees = data?.map((a: any) => ({
    id: a.id,
    first_name: a.first_name,
    last_name: a.last_name,
    email: a.email,
    crew_id: a.crew_id,
    crew_name: a.crews?.name,
    checked_in: a.tickets?.checked_in || false,
    checked_in_at: a.tickets?.checked_in_at,
    created_at: a.created_at,
  }))

  return NextResponse.json({
    attendees,
    total: count,
    page,
    pages: Math.ceil((count || 0) / limit),
  })
}
