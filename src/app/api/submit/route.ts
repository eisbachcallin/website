import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { form, uuid, requestId } = await req.json()
  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Webhook URL not configured' },
      { status: 500 }
    )
  }

  try {
    const zapierResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form, uuid, requestId }), // Send requestId along with form data
    })

    if (!zapierResponse.ok) {
      throw new Error('Zapier webhook request failed')
    }

    return NextResponse.json({ message: 'Form submitted successfully' })
  } catch (error) {
    console.error('Error submitting to Zapier:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
