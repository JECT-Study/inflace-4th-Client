import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

import {
  mockAccessToken,
  mockLoginResponse,
  mockLoginErrorResponse,
  mockRefreshToken,
} from '@/shared/api/mock/mockAuth'

const mockCookieStore = {
  set: vi.fn(),
  get: vi.fn(),
  delete: vi.fn(),
}

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue(mockCookieStore),
}))

beforeEach(() => {
  process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
  process.env.NEXT_PUBLIC_API_URL = 'http://api.example.com'
  vi.clearAllMocks()
  // 기본적으로 state 쿠키가 존재하는 상태로 설정
  mockCookieStore.get.mockReturnValue({ value: 'valid-state' })
})

afterEach(() => {
  vi.restoreAllMocks()
})

function makeRequest(params: Record<string, string>) {
  const url = new URL('http://localhost:3000/auth/callback')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return new NextRequest(url.toString())
}

describe('GET /auth/callback', () => {
  it('Google error 파라미터 존재 시 AUTH_ERROR postMessage HTML을 반환한다', async () => {
    const { GET } = await import('./route')
    const request = makeRequest({
      error: 'access_denied',
      state: 'valid-state',
    })
    const response = await GET(request)

    const text = await response.text()
    expect(text).toContain('AUTH_ERROR')
  })

  it('state 불일치 시 AUTH_ERROR postMessage HTML을 반환한다', async () => {
    const { GET } = await import('./route')
    const request = makeRequest({ code: 'auth-code', state: 'wrong-state' })
    const response = await GET(request)

    const text = await response.text()
    expect(text).toContain('AUTH_ERROR')
  })

  it('code 누락 시 AUTH_ERROR postMessage HTML을 반환한다', async () => {
    const { GET } = await import('./route')
    const request = makeRequest({ state: 'valid-state' })
    const response = await GET(request)

    const text = await response.text()
    expect(text).toContain('AUTH_ERROR')
  })

  it('백엔드 성공 시 Set-Cookie 헤더에서 추출한 refreshToken 쿠키를 설정한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockLoginResponse), {
        status: 200,
        headers: {
          'set-cookie': `refreshToken=${mockRefreshToken}; Path=/; HttpOnly`,
        },
      })
    )

    const { GET } = await import('./route')
    const request = makeRequest({ code: 'auth-code', state: 'valid-state' })
    await GET(request)

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      'refreshToken',
      mockRefreshToken,
      expect.objectContaining({ httpOnly: true, secure: false })
    )
  })

  it('Set-Cookie 헤더가 없으면 refreshToken 쿠키를 설정하지 않는다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockLoginResponse), { status: 200 })
    )

    const { GET } = await import('./route')
    const request = makeRequest({ code: 'auth-code', state: 'valid-state' })
    await GET(request)

    expect(mockCookieStore.set).not.toHaveBeenCalledWith(
      'refreshToken',
      expect.anything(),
      expect.anything()
    )
  })

  it('백엔드 성공 시 AUTH_SUCCESS postMessage HTML을 반환한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockLoginResponse), {
        status: 200,
        headers: {
          'set-cookie': `refreshToken=${mockRefreshToken}; Path=/; HttpOnly`,
        },
      })
    )

    const { GET } = await import('./route')
    const request = makeRequest({ code: 'auth-code', state: 'valid-state' })
    const response = await GET(request)

    const text = await response.text()
    expect(text).toContain('AUTH_SUCCESS')
    expect(text).toContain(mockAccessToken)
  })

  it('백엔드 실패(status not ok) 시 AUTH_ERROR postMessage HTML을 반환한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Unauthorized', { status: 401 })
    )

    const { GET } = await import('./route')
    const request = makeRequest({ code: 'auth-code', state: 'valid-state' })
    const response = await GET(request)

    const text = await response.text()
    expect(text).toContain('AUTH_ERROR')
  })

  it('백엔드 응답에서 success false 시 AUTH_ERROR를 반환한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockLoginErrorResponse), { status: 200 })
    )

    const { GET } = await import('./route')
    const request = makeRequest({ code: 'auth-code', state: 'valid-state' })
    const response = await GET(request)

    const text = await response.text()
    expect(text).toContain('AUTH_ERROR')
  })
})
