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

  // Always include formData, even for error states
  const formData =
    formFirst && formLast && formEmail && formCrew
      ? { formFirst, formLast, formEmail, formCrew }
      : { formFirst: '', formLast: '', formEmail: '', formCrew: '' } // Return empty formData even if missing

  const statusData: StatusData = {
    status,
    message,
    formData, // Always return formData, even on errors
  }

  // Store status in the cache
  statusCache[requestId] = statusData

  return NextResponse.json({ message: 'Status updated successfully' })
}
