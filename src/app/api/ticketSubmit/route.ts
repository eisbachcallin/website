import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Get the form data from the request body
    const formData = await req.json()

    // Get the Zapier webhook URL from environment variables
    const webhookUrl = process.env.WEBHOOK_SITE_URL

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook URL is not set in the environment variables.' },
        { status: 500 }
      )
    }

    // Send the data to the Zapier webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Pass the form data to the webhook
    })

    // Handle the response from Zapier
    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      const result = await response.json()
      return NextResponse.json(
        { error: result.error || 'Submission failed.' },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred.' }, { status: 500 })
  }
}
