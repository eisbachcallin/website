import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const responseData = await req.json()
    const { reqid, status, ticketId, firstName, lastName, email, crew, error } =
      responseData

    if (!reqid) {
      return NextResponse.json(
        { success: false, error: 'Request ID (reqid) is missing.' },
        { status: 400 }
      )
    }

    console.log('Zapier callback received:', responseData)

    if (status === 'error') {
      console.error(`Error from Zapier: ${error}`)
      return NextResponse.json({
        success: false,
        error: error || 'Unknown error occurred.',
      })
    }

    // Handle successful response here
    return NextResponse.json({
      success: true,
      status,
      ticketId,
      firstName,
      lastName,
      email,
      crew,
      error,
    })
  } catch (error) {
    console.error('Error in handleZapierResponse:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
