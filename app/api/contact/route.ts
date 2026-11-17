import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const body: unknown = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { name, email, message } = body as Record<string, unknown>
  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== 'string' || !message.trim()
  ) {
    return NextResponse.json(
      { error: 'Please provide a name, a valid email and a message.' },
      { status: 400 }
    )
  }

  // Connect an email service here (e.g. Resend) to deliver the message.
  console.log('Contact form submission received from', email)

  return NextResponse.json({ success: true })
}