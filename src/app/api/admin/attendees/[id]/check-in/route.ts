import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-server'
import { supabase } from '@/lib/supabase'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookie = req.headers.get('cookie') || ''

  try {
    await requireAdmin(cookie)
  } catch {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const { id } = await params

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id)) {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 })
  }

  const { data, error } = await supabase.rpc('check_in_attendee', {
    p_attendee_id: id,
  })

  if (error) {
    console.error('Check-in error:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  if (data.error) {
    return NextResponse.json({ error: data.error }, { status: 400 })
  }

  return NextResponse.json({
    success: true,
    checked_in_at: data.checked_in_at,
  })
}
