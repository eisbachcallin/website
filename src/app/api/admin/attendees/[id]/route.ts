import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-server'
import { supabase } from '@/lib/supabase'

export async function PATCH(
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

  let body: { confirmed?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  if (typeof body.confirmed !== 'boolean') {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('attendees')
    .update({ confirmed: body.confirmed })
    .eq('id', id)
    .select('id, confirmed')
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }
    console.error('Failed to update attendee:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  return NextResponse.json({ success: true, confirmed: data.confirmed })
}
