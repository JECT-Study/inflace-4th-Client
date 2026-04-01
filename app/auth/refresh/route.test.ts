import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

const mockCookieStore = {
  set: vi.fn(),
  get: vi.fn(),
  delete: vi.fn(),
}

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue(mockCookieStore),
}))

beforeEach(() => {
  process.env.NEXT_PUBLIC_API_URL = 'http://api.example.com'
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('POST /auth/refresh', () => {
  it('RT 쿠키가 없으면 401을 반환한다', async () => {
    mockCookieStore.get.mockReturnValue(undefined)

    const { POST } = await import('./route')
    const response = await POST()

    expect(response.status).toBe(401)
  })

  it('백엔드 성공 시 새 RT 쿠키를 설정한다', async () => {
    mockCookieStore.get.mockReturnValue({ value: 'old-refresh-token' })
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          accessToken: 'new-at',
          refreshToken: 'new-rt',
          user: { id: '1', name: 'Test', email: 'test@test.com', profileImage: '' },
        }),
        { status: 200 }
      )
    )

    const { POST } = await import('./route')
    await POST()

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      '__Host-refresh-token',
      'new-rt',
      expect.objectContaining({ httpOnly: true, secure: true })
    )
  })

  it('백엔드 성공 시 { accessToken, user }를 반환한다', async () => {
    const mockUser = { id: '1', name: 'Test', email: 'test@test.com', profileImage: '' }
    mockCookieStore.get.mockReturnValue({ value: 'old-refresh-token' })
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({ accessToken: 'new-at', refreshToken: 'new-rt', user: mockUser }),
        { status: 200 }
      )
    )

    const { POST } = await import('./route')
    const response = await POST()
    const data = await response.json()

    expect(data.accessToken).toBe('new-at')
    expect(data.user).toEqual(mockUser)
  })

  it('백엔드 실패 시 RT 쿠키를 삭제하고 401을 반환한다', async () => {
    mockCookieStore.get.mockReturnValue({ value: 'old-refresh-token' })
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Unauthorized', { status: 401 })
    )

    const { POST } = await import('./route')
    const response = await POST()

    expect(mockCookieStore.delete).toHaveBeenCalledWith('__Host-refresh-token')
    expect(response.status).toBe(401)
  })

  it('네트워크 에러 시 500을 반환한다', async () => {
    mockCookieStore.get.mockReturnValue({ value: 'old-refresh-token' })
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    const { POST } = await import('./route')
    const response = await POST()

    expect(response.status).toBe(500)
  })
})
