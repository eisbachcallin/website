import { NextRequest, NextResponse } from 'next/server'
import { Configuration, FrontendApi } from '@ory/client'
import { supabase } from '@/lib/supabase'
import { sendConfirmationEmail } from '@/lib/email'

const ory = new FrontendApi(
  new Configuration({ basePath: process.env.NEXT_PUBLIC_ORY_URL })
)

// In-memory rate limiter: max 5 redemption attempts per identity per hour
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const redeemAttempts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(identityId: string): boolean {
  const now = Date.now()
  const record = redeemAttempts.get(identityId)
  if (!record || now > record.resetAt) {
    redeemAttempts.set(identityId, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (record.count >= RATE_LIMIT) return false
  record.count++
  return true
}

// Safe error codes the RPC may return that can be forwarded to the client
const SAFE_RPC_ERRORS = new Set([
  'ticket_not_found',
  'ticket_already_redeemed',
  'already_registered',
  'crew_not_found',
  'crew_inactive',
])

function safeRedeemError(raw: string): string {
  return SAFE_RPC_ERRORS.has(raw) ? raw : 'redemption_failed'
}

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

  if (!identityId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (!checkRateLimit(identityId)) {
    return NextResponse.json({ error: 'too_many_attempts' }, { status: 429 })
  }

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
    return NextResponse.json({ error: safeRedeemError(data.error) }, { status: 400 })
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
