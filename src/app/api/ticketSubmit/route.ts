import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const uuid = url.searchParams.get('id')

    if (!uuid) {
      return NextResponse.json(
        {
          success: false,
          error: 'UUID is missing from the URL query parameter.',
        },
        { status: 400 }
      )
    }

    const formData = await req.json()
    const reqid = randomUUID() // Generate unique request ID
    formData.reqid = reqid

    console.log('Generated reqid:', reqid)

    const webhookUrl = process.env.WEBHOOK_SITE_URL
    const callbackUrl = `${process.env.NGROK_URL}/api/handleZapierResponse` // Use your ngrok URL
    if (!webhookUrl || !callbackUrl) {
      return NextResponse.json(
        { success: false, error: 'Webhook or callback URL is missing.' },
        { status: 500 }
      )
    }

    console.log(`Sending webhook to Zapier: ${webhookUrl}?uuid=${uuid}`)
    console.log('Form data sent to Zapier:', formData)

    // Include the callback URL in the payload
    const payload = {
      ...formData,
      callbackUrl: `${callbackUrl}?reqid=${reqid}`,
    }

    const response = await fetch(`${webhookUrl}?uuid=${uuid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const result = await response.json()
      console.error('Error from Zapier webhook:', result.error)
      return NextResponse.json(
        { success: false, error: result.error || 'Submission failed.' },
        { status: response.status }
      )
    }

    console.log('Zapier webhook triggered successfully.')

    return NextResponse.json({ success: true, reqid })
  } catch (error) {
    console.error('Error in ticketSubmit:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
