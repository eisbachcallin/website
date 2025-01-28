import { NextResponse } from 'next/server'

const statusCache: Record<string, string> = {}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const uuid = searchParams.get('uuid')

  if (!uuid) {
    console.log('GET request missing uuid')
    return NextResponse.json({ error: 'UUID is required' }, { status: 400 })
  }

  const status = statusCache[uuid] || 'pending'
  console.log(`GET request for UUID: ${uuid}, status: ${status}`)
  return NextResponse.json({ status })
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const uuid = searchParams.get('uuid')

  if (!uuid) {
    console.log('POST request missing uuid')
    return NextResponse.json({ error: 'UUID is required' }, { status: 400 })
  }

  const body = await req.json()

  // Extract `status` field from the Zapier payload
  const status = body.status

  console.log(`POST request received for UUID: ${uuid}, status: ${status}`)

  if (status === 'success' || status === 'error') {
    statusCache[uuid] = status // Update the cache
    console.log(`Updated statusCache: ${uuid} -> ${status}`)
  } else {
    console.log('Invalid status in POST request body:', body)
  }

  return NextResponse.json({ message: 'Status updated' })
}
