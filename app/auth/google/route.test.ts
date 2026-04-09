import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

const mockCookieStore = {
  set: vi.fn(),
  get: vi.fn(),
  delete: vi.fn(),
}

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue(mockCookieStore),
}))

// 환경 변수 설정
beforeEach(() => {
  process.env.GOOGLE_CLIENT_ID = 'test-client-id'
  process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
  process.env.NEXT_PUBLIC_MOCK_ENABLED = 'false'
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('GET /auth/google', () => {
  it('랜덤 state를 생성하여 oauth_state 쿠키에 저장한다', async () => {
    const mockUUID = 'test-uuid-1234'
    vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce(mockUUID as `${string}-${string}-${string}-${string}-${string}`)

    const { GET } = await import('./route')
    await GET()

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      'oauth_state',
      mockUUID,
      expect.objectContaining({ httpOnly: true })
    )
  })

  it('Google OAuth URL로 302 리다이렉트를 반환한다', async () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce('test-state' as `${string}-${string}-${string}-${string}-${string}`)

    const { GET } = await import('./route')
    const response = await GET()

    expect(response.status).toBe(307)
    const location = response.headers.get('location')
    expect(location).toContain('accounts.google.com/o/oauth2/v2/auth')
  })

  it('리다이렉트 URL에 client_id가 포함된다', async () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce('test-state' as `${string}-${string}-${string}-${string}-${string}`)

    const { GET } = await import('./route')
    const response = await GET()

    const location = response.headers.get('location')!
    expect(location).toContain('client_id=test-client-id')
  })

  it('리다이렉트 URL에 redirect_uri가 포함된다', async () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce('test-state' as `${string}-${string}-${string}-${string}-${string}`)

    const { GET } = await import('./route')
    const response = await GET()

    const location = response.headers.get('location')!
    expect(location).toContain('redirect_uri=')
    expect(decodeURIComponent(location)).toContain('/auth/callback')
  })

  it('리다이렉트 URL에 state가 포함된다', async () => {
    const mockUUID = 'test-state-value'
    vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce(mockUUID as `${string}-${string}-${string}-${string}-${string}`)

    const { GET } = await import('./route')
    const response = await GET()

    const location = response.headers.get('location')!
    expect(location).toContain(`state=${mockUUID}`)
  })

  it('리다이렉트 URL에 scope가 포함된다', async () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce('test-state' as `${string}-${string}-${string}-${string}-${string}`)

    const { GET } = await import('./route')
    const response = await GET()

    const location = response.headers.get('location')!
    // URLSearchParams는 공백을 '+'로 인코딩하므로 디코딩 후 확인
    const decodedLocation = location.replace(/\+/g, ' ')
    expect(decodedLocation).toContain('openid email profile')
  })
})
