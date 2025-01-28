import { NextResponse } from 'next/server'

const statusCache: Record<string, { status: string; message?: string }> = {}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const uuid = searchParams.get('uuid')

  if (!uuid) {
    console.log('GET request missing uuid')
    return NextResponse.json({ error: 'UUID is required' }, { status: 400 })
  }

  const statusData = statusCache[uuid]

  if (!statusData) {
    // Instead of returning 404, return 200 with a message saying status isn't available yet
    return NextResponse.json({
      status: 'pending',
      message: 'Status not available yet',
    })
  }

  return NextResponse.json(statusData)
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const uuid = searchParams.get('uuid')

  if (!uuid) {
    console.log('POST request missing uuid')
    return NextResponse.json({ error: 'UUID is required' }, { status: 400 })
  }

  // Check if this UUID is already claimed
  if (statusCache[uuid]?.status === 'success') {
    return NextResponse.json({ error: 'UUID already claimed' }, { status: 400 })
  }

  const body = await req.json()

  // Log the entire payload to inspect what Zapier is sending
  console.log('Zapier payload:', body)

  const { status, message } = body

  console.log(
    `POST request received for UUID: ${uuid}, status: ${status}, message: ${message}`
  )

  if (status === 'success' || status === 'error') {
    // Store both status and message (if available)
    statusCache[uuid] = { status, message }
    console.log(
      `Updated statusCache: ${uuid} -> ${status}, message: ${message}`
    )
  } else {
    console.log('Invalid status in POST request body:', body)
  }

  return NextResponse.json({ message: 'Status updated' })
}
