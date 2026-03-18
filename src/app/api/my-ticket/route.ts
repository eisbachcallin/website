import { NextRequest, NextResponse } from 'next/server'
import { Configuration, FrontendApi } from '@ory/client'
import { supabase } from '@/lib/supabase'

const ory = new FrontendApi(
  new Configuration({ basePath: process.env.NEXT_PUBLIC_ORY_URL })
)

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || ''

  let session
  try {
    const { data } = await ory.toSession({ cookie })
    session = data
  } catch {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const identityId = session.identity?.id

  const { data, error } = await supabase
    .from('attendees')
    .select(`id, first_name, last_name, email, crews(name), tickets(uuid)`)
    .eq('ory_identity_id', identityId)
    .maybeSingle()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ ticket: null })
  }

  return NextResponse.json({
    ticket: {
      first: data.first_name,
      last: data.last_name,
      email: data.email,
      crew: (data.crews as any)?.name || '',
      uuid: (data.tickets as any)?.uuid || '',
    },
  })
}
