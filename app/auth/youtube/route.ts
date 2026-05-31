import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  if (process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true') {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/mock-callback`
    )
  }

  const state = `youtube:${crypto.randomUUID()}`

  const cookieStore = await cookies()
  cookieStore.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  })

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    response_type: 'code',
    scope:
      'openid email profile https://www.googleapis.com/auth/youtube.readonly',
    state,
    access_type: 'offline',
    prompt: 'consent',
  })

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  )
}
