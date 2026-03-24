import { NextRequest, NextResponse } from 'next/server'
import { Configuration, FrontendApi } from '@ory/client'
import { supabase } from '@/lib/supabase'
import { sendConfirmationEmail } from '@/lib/email'

const ory = new FrontendApi(
  new Configuration({ basePath: process.env.NEXT_PUBLIC_ORY_URL })
)

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie') || ''

  // Validate Ory session
  let session
  try {
    const { data } = await ory.toSession({ cookie })
    session = data
  } catch {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  // Check email verification
  const verifiedAddresses = session.identity?.verifiable_addresses || []
  const emailVerified = verifiedAddresses.some(
    (addr) => addr.via === 'email' && addr.verified
  )
  if (!emailVerified) {
    return NextResponse.json({ error: 'email_not_verified' }, { status: 403 })
  }

  const body = await req.json()
  const { uuid, first_name, last_name, crew_id } = body

  // Validate UUID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuid || !uuidRegex.test(uuid)) {
    return NextResponse.json({ error: 'invalid_uuid' }, { status: 400 })
  }

  // Validate required fields
  if (!first_name?.trim() || !last_name?.trim() || !crew_id) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  const identityId = session.identity?.id
  const email = session.identity?.traits?.email

  // Call Supabase function
  const { data, error } = await supabase.rpc('redeem_ticket', {
    p_uuid: uuid,
    p_ory_identity_id: identityId,
    p_first_name: first_name.trim(),
    p_last_name: last_name.trim(),
    p_email: email,
    p_crew_id: parseInt(crew_id, 10),
  })

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  // data is the JSONB result from the function
  if (data.error) {
    return NextResponse.json({ error: data.error }, { status: 400 })
  }

  // Resolve crew name for the confirmation email
  const { data: crewData } = await supabase
    .from('crews')
    .select('name')
    .eq('id', parseInt(crew_id, 10))
    .single()

  // Send confirmation email — failure does not affect redemption
  try {
    await sendConfirmationEmail(email, {
      first: first_name.trim(),
      last: last_name.trim(),
      crew: crewData?.name || '',
      uuid,
    })
  } catch (err) {
    console.error('Failed to send confirmation email:', err)
  }

  return NextResponse.json({
    success: true,
    attendee_id: data.attendee_id,
  })
}
