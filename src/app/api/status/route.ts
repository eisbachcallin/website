import { NextResponse } from 'next/server'

type StatusData = {
  status: string
  message: string
  formData?: {
    formFirst: string
    formLast: string
    formEmail: string
    formCrew: string
  }
}

const statusCache: Record<string, StatusData> = {}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const uuid = searchParams.get('uuid')
  const requestId = searchParams.get('requestId')

  if (!uuid || !requestId) {
    return NextResponse.json(
      { error: 'UUID and requestId are required' },
      { status: 400 }
    )
  }

  const statusData = statusCache[requestId]

  if (!statusData) {
    return NextResponse.json({
      status: 'pending',
      message: 'Status not available yet',
    })
  }

  return NextResponse.json(statusData)
}

export async function POST(req: Request) {
  const body = await req.json()

  // Log the full payload to check for any missing fields
  console.log('Received Zapier payload:', body)

  const {
    status,
    message,
    requestId,
    uuid,
    formFirst,
    formLast,
    formEmail,
    formCrew,
  } = body

  // Check if essential fields are present
  if (!requestId || !uuid || !status || !message) {
    console.error('Missing required fields in response:', body)
    return NextResponse.json(
      { error: 'Missing required fields in response' },
      { status: 400 }
    )
  }

  // If the form data is missing, handle it accordingly
  const formData =
    formFirst && formLast && formEmail && formCrew
      ? { formFirst, formLast, formEmail, formCrew }
      : undefined // Optionally, you could fallback to default values or skip this

  // Create status data object to store
  const statusData: StatusData = {
    status,
    message,
    formData, // Only add formData if it exists
  }

  // Store status in the cache
  statusCache[requestId] = statusData

  return NextResponse.json({ message: 'Status updated successfully' })
}
